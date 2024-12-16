CREATE OR REPLACE FUNCTION create_user_on_auth() 
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.users(id, email, username)
  VALUES(
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'username'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_user_on_auth_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_user_on_auth();