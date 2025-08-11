import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	try {
		const data = await sql`
			SELECT invoices.amount, customers.name
			FROM invoices
			JOIN customers ON invoices.customer_id = customers.id
			WHERE invoices.amount = 666;
		`;
		return data;
	} catch (error) {
		console.error('Database error:', error);
		throw error;
	}
}

// Export GET handler for the route
export async function GET() {
	try {
		const data = await listInvoices();
		return NextResponse.json({ success: true, data });
	} catch (error) {
		console.error('Route error:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch data' },
			{ status: 500 }
		);
	}
}