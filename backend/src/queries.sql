create table amazon.users
(
	id SERIAL unique not null,
	name varchar(256) not null,
	email varchar(1024) not null,
	password varchar(2048) not null,
	primary key(id, email)
);

create table amazon.addresses
(
	id SERIAL not null,
	user_id integer,
	address text,
	primary key(id),
	foreign key(user_id) references amazon.users(id)
);

CREATE PROCEDURE amazon.create_user(IN user_name text, IN user_email text, IN user_password text, OUT new_user_id INT)
LANGUAGE plpgsql
AS $$
BEGIN

IF EXISTS (SELECT 1 FROM amazon.users WHERE email = user_email) THEN
	RAISE EXCEPTION 'Email % already exists', user_email USING ERRCODE = '45000';

ELSE
	INSERT INTO amazon.users(name, email, password) VALUES (user_name, user_email, user_password) RETURNING id INTO new_user_id;

END IF;

END;
$$;

create table amazon.categories
(
	id serial not null unique primary key,
	name text
);

create table amazon.subcategories
(
	id serial not null,
	name text,
	category_id integer,
	id),
	foreign key(category_id) references categories(id)
);

create table amazon.producttypes (
id serial primary key,
name text,
subcategory_id integer references amazon.subcategories(id)
);

create table amazon.filters (
	id serial primary key,
	producttypeid integer,
	key text,
	value text,
	foreign key(producttypeid) references amazon.producttypes(id)
);

create table amazon.filter_options
(
id serial not null unique primary key,
filter_id integer references amazon.filters(id),
value text not null
);


create table amazon.products
(
id serial not null unique primary key,
name text,
description text,
category_id integer references amazon.categories(id),
subcategory_id integer references amazon.subcategories(id),
product_type integer references amazon.producttypes(id),
price numeric(10, 2),
brand text,
image_url text
);

create table amazon.product_attributes
(
	id serial not null unique primary key,
	product_id integer references products(id),
	key text not null,
	value text not null
);