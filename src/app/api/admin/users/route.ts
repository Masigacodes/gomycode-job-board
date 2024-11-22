import { deleteUser, getUsers } from '@/models/UserModel';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await getUsers(); // Fetch users from the database
  return NextResponse.json(users);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await deleteUser(id); // Delete a user by ID
  return NextResponse.json({ success: true });
}
