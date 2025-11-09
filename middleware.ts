import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware - currently disabled to allow client-side authentication handling
// The home page will handle authentication checks via API calls instead
export function middleware(request: NextRequest) {
	// Allow all requests to pass through
	// Authentication is handled client-side in the home page component
	return NextResponse.next()
}

export const config = {
	// Disable matcher to skip middleware entirely
	matcher: [],
}
