--
-- PostgreSQL database dump
--

\restrict t2ILK5JCuWJd0XW9rM1woKp2mMwpCn8vSDBcRYwP2K39AN82jvbBh86DdGUbQLS

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg12+1)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: drake_portfolio_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO drake_portfolio_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: public; Owner: drake_portfolio_user
--

CREATE TABLE public.events (
    id character varying NOT NULL,
    name character varying NOT NULL,
    location character varying NOT NULL,
    date character varying NOT NULL,
    role character varying NOT NULL,
    achievement character varying,
    "desc" text NOT NULL
);


ALTER TABLE public.events OWNER TO drake_portfolio_user;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: drake_portfolio_user
--

CREATE TABLE public.projects (
    id character varying NOT NULL,
    title character varying NOT NULL,
    subtitle character varying NOT NULL,
    "desc" text NOT NULL,
    tags character varying[] NOT NULL,
    color character varying NOT NULL,
    image character varying NOT NULL,
    likes integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.projects OWNER TO drake_portfolio_user;

--
-- Name: skills; Type: TABLE; Schema: public; Owner: drake_portfolio_user
--

CREATE TABLE public.skills (
    id integer NOT NULL,
    category character varying NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.skills OWNER TO drake_portfolio_user;

--
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: drake_portfolio_user
--

CREATE SEQUENCE public.skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skills_id_seq OWNER TO drake_portfolio_user;

--
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: drake_portfolio_user
--

ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;


--
-- Name: skills id; Type: DEFAULT; Schema: public; Owner: drake_portfolio_user
--

ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: drake_portfolio_user
--

COPY public.events (id, name, location, date, role, achievement, "desc") FROM stdin;
ctf	Capture The Flag	Cebu Eastern College, Cebu City	February 7, 2026	Champion	champion	Competed in a cybersecurity Capture The Flag challenge during CEC IT Days, clinching 1st place by solving challenges across cryptography, web exploitation, and forensics.
webdev	Web Dev Design	Cebu Eastern College, Cebu City	February 7, 2026	1st Runner-Up	runner-up	Collaborated with my team to design and build a web application during CEC IT Days, earning 1st Runner-Up for our UI/UX design and overall execution.
ai	Gemini Study Jam	DOST Cebu City	December 7, 2025	Participant	\N	Attended the Google Gemini Study Jam, a hands-on workshop exploring Gemini AI capabilities and practical AI integrations for developers.
capstone	Capstone Presentation	Cebu Eastern College, Cebu City	April 14, 2026	Presenter	\N	Presented our capstone project to a panel of faculty and industry professionals, demonstrating technical implementation, research findings, and real-world impact.
ict	ICT Congress	Cebu Coliseum, Cebu City	April 30, 2026	Delegate	\N	Participated in the ICT Congress, engaging with talks and workshops on emerging technologies, digital transformation, and the future of the tech industry in the region.
launch	Launch 2025	Cebu City	November 29, 2025	Attendee	\N	Attended Launch 2025, a flagship tech event celebrating innovation, student projects, and the kickoff of the academic year's technology initiatives.
networksec	Network Security Seminar	DOST Cebu City	November 15, 2025	Attendee	\N	Joined a network security seminar covering modern threat landscapes, ethical hacking fundamentals, and best practices for securing systems and infrastructure.
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: drake_portfolio_user
--

COPY public.projects (id, title, subtitle, "desc", tags, color, image, likes) FROM stdin;
beauty	Beauty Platform	E-Commerce / Beauty	A full featured beauty e-commerce platform with product listings, cart management, and a custom CMS built on a PHP backend.	{PHP,TailwindCSS,JavaScript,MySQL,HTML}	#ec4899	/assets/images/projects/beauty.jpeg	4
awscc-flurry	AWS Skill Builder	Org Project	My role in this project was focused on the frontend building responsive, accessible UI components	{Reactjs,"Tailwind CSS"}	#FF9900	/assets/images/projects/aws.jpeg	3
realestate	Haven	Capstone Project	A property listing and management web app with search, filters, and a server-side backend powered by ASP.NET and SQLite.	{HTML,CSS,ASP.NET,JavaScript,SQLite}	#3b82f6	/assets/images/projects/realestate.jpeg	4
trustpulse	TrvstPvlse	Phishing Detection	A real-time phishing detection tool that surfaces trust signals on landing pages, built with a React frontend and FastAPI backend.	{Reactjs,TailwindCSS,FastAPI}	#06b6d4	/assets/images/projects/trustpulse.jpeg	4
me	My Portfolio	Personal Site	My personal developer portfolio showcasing projects, skills, and experience. Built with a modern React frontend and a FastAPI backend.	{Reactjs,Tailwindcss,FastAPI,PostgreSQL}	#7a33ff	/assets/images/projects/me.jpeg	6
publika	Publika	E-Service	This project was made for school contest and got 1st runner up.	{HTML,CSS,JavaScript}	#10b981	/assets/images/projects/publika.jpeg	4
museo	Pambansang Museo	Museum / Gallery	An interactive museum guide web app presenting exhibits and collections with clean, accessible design using vanilla web technologies.	{HTML,CSS,JavaScript}	#f59e0b	/assets/images/projects/museo.jpeg	4
smp	NULL SMP	Minecraft Server	A minecraft server with plugins and custom features.	{Reactjs,php,MySQL,"Tailwind CSS"}	#6366f1	/assets/images/projects/smp.jpeg	4
\.


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: drake_portfolio_user
--

COPY public.skills (id, category, name) FROM stdin;
1	Development	Python
2	Development	C++
3	Development	C
4	Development	C#
5	Development	Java
6	Development	JavaScript
7	Development	HTML
8	Development	CSS
9	Development	React.js
10	Development	Tailwind CSS
11	Development	Vue.js
12	Development	Bootstrap
13	Development	ASP.NET
14	Development	PHP
15	Development	MySQL
16	Development	PostgreSQL
17	Development	FastAPI
18	Development	SQLite
19	Development	Firebase
20	Cybersecurity	Nmap
21	Cybersecurity	Burp Suite
22	Cybersecurity	Wireshark
23	Cybersecurity	Hydra
24	Cybersecurity	Gobuster
25	Cybersecurity	ffuf
26	Cybersecurity	John the Ripper
27	Cybersecurity	Metasploit
28	Development	Docker
29	Development	AWS
30	Development	Git
31	Development	Postman
32	Development	GitHub
33	Development	Linux
34	Development	Bash
\.


--
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: drake_portfolio_user
--

SELECT pg_catalog.setval('public.skills_id_seq', 34, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: drake_portfolio_user
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: drake_portfolio_user
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: drake_portfolio_user
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO drake_portfolio_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO drake_portfolio_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO drake_portfolio_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO drake_portfolio_user;


--
-- PostgreSQL database dump complete
--

\unrestrict t2ILK5JCuWJd0XW9rM1woKp2mMwpCn8vSDBcRYwP2K39AN82jvbBh86DdGUbQLS

