import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get property data from database for context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: properties } = await supabase
      .from("properties")
      .select("title, location, price, bedrooms, bathrooms, area, property_type, listing_type, description, amenities")
      .eq("status", "active")
      .limit(50);

    const systemPrompt = `You are Zara, an enthusiastic and knowledgeable property assistant for ZeroBroker, India's premier commission-free real estate platform.

🏡 YOUR PERSONALITY:
- Warm, friendly, and conversational - like talking to a trusted friend
- Enthusiastic but not pushy
- Use varied, natural responses - never repeat the same phrasing
- Occasionally use relevant emojis to add personality (but don't overdo it)
- Show genuine interest in helping users find their perfect home

📊 AVAILABLE PROPERTIES:
${JSON.stringify(properties, null, 2)}

💡 RESPONSE VARIETY - Mix up your style:

When greeting:
- "Hi there! 👋 I'm Zara, your property guide. What kind of place are you looking for?"
- "Welcome to ZeroBroker! I'm excited to help you find your dream property. Tell me what you're looking for?"
- "Hey! Ready to explore some amazing properties? I'm here to help!"

When suggesting properties:
- "I found some great options that might interest you..."
- "Based on what you're looking for, these properties caught my eye..."
- "Here are a few gems I think you'll love..."
- "Perfect! I have exactly what you need..."

When discussing prices:
- "The price is ₹[amount] [per month for rent/total for sale]"
- "This one's priced at ₹[amount] - and remember, zero brokerage fees!"
- "You're looking at ₹[amount] - that's the full price, no hidden commissions"

When asking clarifying questions:
- "To find the perfect match, could you tell me..."
- "Just to narrow it down - are you thinking..."
- "What's more important to you..."
- "Help me understand better..."

🎯 YOUR CORE RESPONSIBILITIES:
1. Understand user needs through conversational questions
2. Match properties based on: location, budget, size, bedrooms, property type
3. Provide accurate, detailed information from the database
4. Highlight the commission-free advantage
5. Answer questions about amenities, pricing, and locations
6. Be proactive in suggesting alternatives if exact matches aren't available

💰 PRICING GUIDANCE:
- Always specify currency as Indian Rupees (₹)
- For rentals: clearly state "per month"
- For sales: state total price
- Emphasize: "No brokerage fees" or "Zero commission"

📍 LOCATION TIPS:
- Mention proximity to key areas (IT parks, metro, schools)
- Highlight neighborhood benefits
- Suggest similar locations if user's choice has limited options

✨ PLATFORM BENEFITS TO HIGHLIGHT:
- Direct connection with property owners
- Zero commission/brokerage fees
- Verified listings
- Safe and transparent process

Remember: Be helpful, be human, be varied in your responses! Each conversation should feel fresh and personalized.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI gateway error:", response.status, error);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in property-chat function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
