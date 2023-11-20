
import { connect } from "@/bin/dbConfig";
import User from '@/models/userModel';
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import toast from 'react-hot-toast';


async function createUser(username, email, password) {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("User already exists");
    toast.error('User already exists');
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  const savedUser = await newUser.save();

  return savedUser;
}

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    await connect();

    const savedUser = await createUser(username, email, password);

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
