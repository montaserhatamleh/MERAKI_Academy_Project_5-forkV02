-- Build Your Tables Here --
CREATE TABLE roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE permissions (
  permission_id SERIAL PRIMARY KEY,
  permission_name VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE role_permissions (
  role_permission_id SERIAL PRIMARY KEY,
  role_id INT REFERENCES roles(role_id),
  permission_id INT REFERENCES permissions(permission_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  address TEXT,
  phone_number VARCHAR,
  role_id INT REFERENCES roles(role_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE riders (
  rider_id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(user_id),
  vehicle_details VARCHAR,
  status VARCHAR DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE pending_registrations_rider (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  address TEXT,
  phone_number VARCHAR,
  role_id INT,
  vehicle_details VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE pending_registrations_ownerRes (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  address TEXT,
  phone_number VARCHAR,
  category VARCHAR,
  role_id INT,
  restaurant_name VARCHAR,
  restaurant_address TEXT,
  restaurant_phone_number VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE restaurants (
  restaurant_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  user_id INT
  address TEXT,
  category VARCHAR,
  phone_number VARCHAR,
  rating DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

