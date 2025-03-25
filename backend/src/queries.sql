```
create table amazon.users
(
	id integer generated always as identity primary key,
	name character varying,
	email character varying unique,
	password character varying,
	created_At timestamp with time zone default current_timestamp
);


create table amazon.addresses
(
id integer generated always as identity primary key,
user_id integer,
address character varying,
foreign key(user_id) references users(id)
);

create or replace procedure createuser
(
in user_name text,
in user_email text,
in user_password text
)
AS $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM amazon.users WHERE email = user_email) THEN
	INSERT INTO amazon.users(name, email, password) VALUES (user_name, user_email, user_password);
END IF;
END;
$$ LANGUAGE PLPGSQL;

```