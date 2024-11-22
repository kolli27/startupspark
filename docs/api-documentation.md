# API Documentation

## Authentication
All API endpoints require authentication via a valid session token. Authentication is handled through Supabase.

## Endpoints

### AI Generation
`POST /api/ai/generate`
- Generates AI recommendations based on user input
- Request Body: User input parameters
- Response: AI-generated recommendations

### Questionnaire
`POST /api/questionnaire/submit`
- Submits questionnaire responses
- Request Body: Questionnaire answers
- Response: Submission confirmation

`GET /api/questionnaire/responses/latest`
- Retrieves the user's latest questionnaire responses
- Response: Latest questionnaire responses

### Recommendations
`GET /api/recommendations`
- Retrieves all saved recommendations
- Response: List of recommendations

`POST /api/recommendations`
- Saves a new recommendation
- Request Body: Recommendation data
- Response: Saved recommendation

`PATCH /api/recommendations/[id]`
- Updates an existing recommendation
- Request Body: Updated recommendation data
- Response: Updated recommendation

`DELETE /api/recommendations/[id]`
- Deletes a recommendation
- Response: Deletion confirmation

### Stripe Integration
`POST /api/stripe/checkout`
- Creates a checkout session
- Request Body: Subscription plan details
- Response: Checkout session URL

`GET /api/stripe/subscription`
- Gets current subscription status
- Response: Subscription details

`POST /api/stripe/subscription`
- Creates a new subscription
- Request Body: Subscription details
- Response: New subscription information

`PUT /api/stripe/subscription`
- Updates subscription
- Request Body: Updated subscription details
- Response: Updated subscription information

`POST /api/stripe/webhook`
- Handles Stripe webhook events
- Request Body: Webhook event data
- Response: Event processing confirmation

### Monitoring
`POST /api/monitoring/analytics`
- Logs analytics events
- Request Body: Analytics data
- Response: Logging confirmation

`POST /api/monitoring/performance`
- Logs performance metrics
- Request Body: Performance data
- Response: Logging confirmation

`POST /api/monitoring/error`
- Logs error events
- Request Body: Error details
- Response: Logging confirmation

## Error Handling
All endpoints follow a consistent error handling pattern:
- 400: Bad Request - Invalid input
- 401: Unauthorized - Authentication required
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource doesn't exist
- 500: Internal Server Error - Server-side error

## Rate Limiting
API endpoints are subject to rate limiting to ensure service stability.
