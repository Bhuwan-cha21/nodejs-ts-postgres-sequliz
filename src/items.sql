-- get items by id
CREATE OR REPLACE FUNCTION public.getitembyid(
	item_id integer)
    RETURNS TABLE(code integer, data jsonb) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
   RETURN QUERY select items.code, translations.data from items  join translations on  items.translationcode = translations.translationcode where items.id = item_id;
END;
$BODY$;

ALTER FUNCTION public.getitembyid(integer)
    OWNER TO postgres;
--update items
CREATE OR REPLACE FUNCTION public.update_items(
	item_code integer,
	updated_languages jsonb)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
  

DECLARE t_code int;
BEGIN
   select translationcode into t_code from items where code = item_code;
   update translations
   set data = updated_languages
   where translationcode = t_code;
END;
$BODY$;

ALTER FUNCTION public.update_items(integer, jsonb)
    OWNER TO postgres;

--insertitems
    CREATE OR REPLACE FUNCTION public.insert_items(
	item_code integer,
	item_translationcode integer,
	item_languages jsonb)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
  insert into  items(code,translationcode) values(item_code,item_translationcode);
  insert into translations(translationcode , data ) values(item_translationcode, item_languages);
END;
$BODY$;

ALTER FUNCTION public.insert_items(integer, integer, jsonb)
    OWNER TO postgres;
--getitems
    CREATE OR REPLACE FUNCTION public.getitems(
	)
    RETURNS TABLE(code integer, data jsonb) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
   RETURN QUERY select items.code, translations.data from items  join translations on  items.translationcode = translations.translationcode;
END;
$BODY$;

ALTER FUNCTION public.getitems()
    OWNER TO postgres;