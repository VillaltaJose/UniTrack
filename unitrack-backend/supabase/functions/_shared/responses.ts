// deno-lint-ignore-file no-explicit-any
import { corsHeaders } from '../_shared/cors.ts';

export const errorResponse = (error: any, status = 500) => {
	return new Response(
		JSON.stringify(error),
		{
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: status
		}
	);
}

export const okResponse = (data: any) => {
	return new Response(
		JSON.stringify(data),
		{
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 200
		}
	);
}