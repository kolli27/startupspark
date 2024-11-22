# Stripe Setup Guide

## Products and Prices Setup

1. Log in to your Stripe Dashboard
2. Navigate to Products > Add Product

### Premium Subscription Product

Create a new product with the following details:

```
Name: Premium Subscription
Description: Get unlimited business ideas and advanced features
Default price: $9.99/month or $99/year
```

Configuration steps:
1. Set the product name and description
2. Add two recurring prices:
   - Monthly: $9.99/month
   - Annual: $99/year (Save ~17%)
3. Set the lookup_key for both prices to "premium"
4. Enable tax collection if required
5. Save the product

## Environment Variables

Update your environment variables with the following Stripe configuration:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_ANNUAL_PRICE_ID=price_xxxxx
```

## Webhook Configuration

1. In the Stripe Dashboard, go to Developers > Webhooks
2. Add a new endpoint with your application's webhook URL
3. Add the following events to listen for:
   - checkout.session.completed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded

## Usage-Based Billing (Optional)

If you want to implement usage-based billing:

1. Create a usage-based price for the Premium product
2. Configure the price with:
   - Usage type: Metered
   - Aggregation mode: Sum of usage during period
   - Price per unit: Set as needed
3. Update the webhook handler to track usage with `stripe.subscriptionItems.createUsageRecord`

## Testing

Use Stripe's test mode to verify the integration:

1. Test card numbers:
   - Success: 4242 4242 4242 4242
   - Decline: 4000 0000 0000 0002

2. Test webhook events:
   - Use the Stripe CLI to forward webhooks locally
   - Test each subscription event type
   - Verify usage tracking and limits

## Production Checklist

Before going live:

1. Verify all webhook endpoints are properly configured
2. Test the complete subscription lifecycle
3. Ensure error handling is robust
4. Set up monitoring for failed payments
5. Configure customer email notifications
6. Set up Stripe tax handling if required
7. Test the upgrade/downgrade flows
8. Verify usage limits are properly enforced

## Subscription Management

The system handles the following subscription states:

- Free tier (default)
- Premium active
- Premium canceled (remains active until period end)
- Premium past due
- Premium incomplete

Each state triggers appropriate usage limits and feature access.

## Usage Tracking

The system tracks:

1. Business idea generations
2. Market insights usage
3. Follow-up questions

Limits per tier:
- Free: 3 ideas/month, no advanced features
- Premium: Unlimited ideas and features

The usage tracking system automatically:
- Resets counters on renewal
- Enforces limits based on tier
- Updates usage statistics in real-time
