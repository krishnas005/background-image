import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connect } from '@/bin/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: 'Invalid Password' }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const tokenSecret = process.env.TOKEN_SECRET || 'defaultSecretKey';

    if (!tokenSecret || tokenSecret === 'defaultSecretKey') {
      console.error('Warning: Using default or missing TOKEN_SECRET. Please set a strong secret key.');
    }

    const token = await jwt.sign(tokenData, tokenSecret, { expiresIn: '1h' });

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production if using HTTPS
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
