import { corsHeaders } from '../_shared/cors.ts';

export const errorResponse = (error, status = 500) => {
	return new Response(
		JSON.stringify(error),
		{
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: status
		}
	);
}

export const okResponse = (data) => {
	return new Response(
		typeof data === 'string' ? data : JSON.stringify(data),
		{
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 200
		}
	);
}