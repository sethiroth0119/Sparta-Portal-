// Quick agent account creation script
const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptAsync(password, salt, 64));
  return `${buf.toString('hex')}.${salt}`;
}

async function createAgentAccounts() {
  // Add your real agents here with their actual emails
  const agents = [
    { name: 'Agent Name', email: 'agent@example.com', password: 'Athena0119' },
    // Add more agents as needed
  ];

  for (const agent of agents) {
    const hashedPassword = await hashPassword(agent.password);
    console.log(`INSERT INTO agents (name, email, password, phone, specialization, experience, status, invite_code, created_at, updated_at) VALUES ('${agent.name}', '${agent.email}', '${hashedPassword}', '+1-555-0000', 'Business Development', 'Senior', 'active', 'AGENT${Math.random().toString(36).substr(2, 3).toUpperCase()}', NOW(), NOW());`);
  }
}

createAgentAccounts().catch(console.error);