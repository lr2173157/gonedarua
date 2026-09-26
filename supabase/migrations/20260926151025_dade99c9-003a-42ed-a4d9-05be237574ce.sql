CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TABLE public.user_roles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE, role public.app_role NOT NULL DEFAULT 'user');
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE FUNCTION public.is_store_admin(_user_id uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'admin') $$;
GRANT EXECUTE ON FUNCTION public.is_store_admin(uuid) TO authenticated;
CREATE FUNCTION public.claim_store_admin() RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN IF auth.uid() IS NULL THEN RETURN false; END IF; PERFORM pg_advisory_xact_lock(86753091); IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN RETURN public.is_store_admin(auth.uid()); END IF; INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin') ON CONFLICT (user_id) DO UPDATE SET role = 'admin'; RETURN true; END $$;
REVOKE ALL ON FUNCTION public.claim_store_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_store_admin() TO authenticated;
CREATE TABLE public.store_settings (id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1), brand_name text NOT NULL DEFAULT 'Gonê da Rua', hero_title text NOT NULL DEFAULT 'FEITO PRA OCUPAR ESPAÇO.', hero_subtitle text NOT NULL DEFAULT 'Oversized de verdade. Arte que não pede licença.', announcement text NOT NULL DEFAULT 'DOIS TEES POR R$180 · USE SEU CUPOM DE R$10', about_text text NOT NULL DEFAULT 'Da rua pra rua. Camisetas oversized com atitude, arte e identidade.', logo_url text NOT NULL, hero_image_url text NOT NULL, accent_color text NOT NULL DEFAULT '#d6ff41', promo_price numeric(10,2) NOT NULL DEFAULT 180, coupon_code text NOT NULL DEFAULT 'GONE10', coupon_discount numeric(10,2) NOT NULL DEFAULT 10, instagram_url text NOT NULL DEFAULT '', whatsapp_number text NOT NULL DEFAULT '', updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.store_settings TO anon, authenticated;
GRANT UPDATE ON public.store_settings TO authenticated;
GRANT ALL ON public.store_settings TO service_role;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public store settings" ON public.store_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin update settings" ON public.store_settings FOR UPDATE TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));
CREATE TABLE public.products (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, price numeric(10,2) NOT NULL CHECK (price >= 0), front_url text NOT NULL, back_url text, category text NOT NULL DEFAULT 'Camisetas', description text NOT NULL DEFAULT '', sort_order integer NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public active products" ON public.products FOR SELECT TO anon USING (active = true);
CREATE POLICY "authenticated products" ON public.products FOR SELECT TO authenticated USING (active = true OR public.is_store_admin(auth.uid()));
CREATE POLICY "admin insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.is_store_admin(auth.uid()));
CREATE POLICY "admin update products" ON public.products FOR UPDATE TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));
CREATE POLICY "admin delete products" ON public.products FOR DELETE TO authenticated USING (public.is_store_admin(auth.uid()));
CREATE FUNCTION public.touch_store_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER touch_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_store_updated_at();
CREATE TRIGGER touch_settings BEFORE UPDATE ON public.store_settings FOR EACH ROW EXECUTE FUNCTION public.touch_store_updated_at();
INSERT INTO public.store_settings (id, logo_url, hero_image_url) VALUES (1, '/__l5e/assets-v1/ef705640-768d-4e9a-8234-420cc1507f1e/logo.webp', '/__l5e/assets-v1/95b879ee-47d6-44f4-a227-5e97a2d6503a/matue-xtranho-mockup-frente.webp');
INSERT INTO public.products (name, price, front_url, back_url, category, sort_order) VALUES
('Jordan Nike', 109, '/__l5e/assets-v1/8d9fef1d-195d-4f8e-acf0-e2a3b2465cd4/Frente-jordan-nike-mockup.webp', '/__l5e/assets-v1/fb0fa2a0-422c-48bf-86db-37e2a6daddba/costas-jordan-nike-mockup.webp', 'Preta', 1),
('Smoking KD', 109, '/__l5e/assets-v1/7bb0bfff-bee8-439c-93a2-a07c7a88fdb2/smoking-kd-mockup-frente.webp', '/__l5e/assets-v1/0ec16e42-6ad3-4b52-b7fb-a360777ef4f2/smoking-kd-costas-mockup.webp', 'Preta', 2),
('Mano Underground', 99, '/__l5e/assets-v1/9444787f-aced-4df5-8f39-f82192d25ded/mano-undergrround-frente-mockup.webp', '/__l5e/assets-v1/b164ac9f-0e87-4c74-8481-20c629ab8403/mano-underground-mockup-costas.webp', 'Preta', 3),
('Brandão Branco', 99, '/__l5e/assets-v1/bf284519-91c7-482f-9823-3daf6123336b/brandão-branco-mockup-fremte.webp', '/__l5e/assets-v1/f54abb88-b53e-48de-8a5d-6d62fa2fa443/brandão-branco-mockup-costas.webp', 'Clara', 4),
('Xtranho', 109, '/__l5e/assets-v1/95b879ee-47d6-44f4-a227-5e97a2d6503a/matue-xtranho-mockup-frente.webp', NULL, 'Preta', 5),
('Brandão Selo Trap', 109, '/__l5e/assets-v1/f2915b05-392c-4092-8b15-5d6cae129276/brandão-selo-trap-mockup.webp', NULL, 'Preta', 6),
('Direto da Selva', 99, '/__l5e/assets-v1/b9403f7b-2bf0-430d-91d1-1ee3b57bb582/direto-da-selva-mockup-frente.webp', NULL, 'Clara', 7),
('MF DOOM', 99, '/__l5e/assets-v1/a6f45ebc-618d-4913-b187-5f4054f47a21/mf-doom-nike-mockup.webp', NULL, 'Clara', 8),
('Matuê MDA', 99, '/__l5e/assets-v1/b872e3a1-4fd5-4ed2-a27f-ff55a4876778/matue-mda-mockup.webp', NULL, 'Clara', 9),
('MDA Matuê', 99, '/__l5e/assets-v1/f949494e-2662-49de-a8b2-907cc2d29cc4/mda-matue-mockup.webp', NULL, 'Clara', 10),
('Ney', 99, '/__l5e/assets-v1/3474c8bb-ea7f-43a6-a730-78a2e134bc68/ney-mockup.webp', NULL, 'Clara', 11),
('Goku Nike', 109, '/__l5e/assets-v1/fefdd5a7-628a-41b3-9822-9b6a55cf1d0c/Nike_Goku_estinto_superior-_mockup.webp', NULL, 'Preta', 12),
('Nike Rascunho', 109, '/__l5e/assets-v1/d58067e8-758d-4d08-bc6d-2df8cc05bca8/nike-rascunho-frente.webp', NULL, 'Preta', 13),
('Racionais SFS', 109, '/__l5e/assets-v1/cc50808b-8fae-47a0-a643-949d46549289/racionais-sfs-mockup.webp', NULL, 'Preta', 14),
('Relíquia', 99, '/__l5e/assets-v1/23a67833-f61d-40a0-b1cb-7d6094097833/relikia-mockup.webp', NULL, 'Clara', 15),
('Sabotage', 99, '/__l5e/assets-v1/d9dd529b-9353-4830-a6db-53a40b597f63/sabotage-mockup.webp', NULL, 'Clara', 16),
('São Jorge Racionais', 109, '/__l5e/assets-v1/9f23206d-4f1d-4f1d-bdb5-2c55bd84b3ff/são-jorge-racionais-mockup-frente.webp', NULL, 'Preta', 17),
('Cream Essential', 89, '/__l5e/assets-v1/653fac66-da59-4733-ba88-2537c4bd6660/cream_Front.webp', '/__l5e/assets-v1/9d4f31b4-d74e-418f-a266-9ff765d78d0b/cream_Black.webp', 'Clara', 18),
('Jesus', 109, '/__l5e/assets-v1/ab9b1cd1-a4be-4e80-b3c3-402976fe6874/Js.webp', NULL, 'Preta', 19);