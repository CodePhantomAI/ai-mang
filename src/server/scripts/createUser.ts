import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Organization } from '../models/Organization';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = "mongodb+srv://eranfixer:Aa123456@cluster0.aqhcyqz.mongodb.net/management-system?retryWrites=true&w=majority";

async function createUserWithOrganization() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Create organization
    const organization = new Organization({
      name: 'Default Organization',
      email: 'jannaskgdes@hotmail.com',
    });
    await organization.save();
    console.log('Organization created successfully');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123123123', salt);

    // Create user
    const user = new User({
      organizationId: organization._id,
      firstName: 'Default',
      lastName: 'User',
      email: 'jannaskgdes@hotmail.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      emailVerified: true
    });
    await user.save();
    console.log('User created successfully');

    console.log('\nCreated user with:');
    console.log('Email: jannaskgdes@hotmail.com');
    console.log('Password: 123123123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createUserWithOrganization();
