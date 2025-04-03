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