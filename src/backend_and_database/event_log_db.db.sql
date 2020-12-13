BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "event_details" (
	"event_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"club_id"	NUMERIC NOT NULL,
	"event_name"	TEXT NOT NULL,
	"event_date"	TEXT NOT NULL,
	"event_time"	INTEGER,
	"event_venue"	TEXT,
	"event_type"	TEXT,
	"event_desc"	TEXT,
	"event_poster"	BLOB,
	"event_reg_link"	TEXT,
	"event_reg_fee"	INTEGER,
	"event_reg_deadline"	TEXT NOT NULL,
	"isModified"	TEXT,
	"added_by"	INTEGER,
	"modification_date"	INTEGER,
	FOREIGN KEY("club_id") REFERENCES "club_details"("club_id")
);
CREATE TABLE IF NOT EXISTS "user_details" (
	"user_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"user_name"	TEXT NOT NULL,
	"user_mail"	TEXT NOT NULL,
	"isOrganizer"	INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS "organizer_details" (
	"organizer_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"club_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	FOREIGN KEY("club_id") REFERENCES "club_details"("club_id"),
	FOREIGN KEY("user_id") REFERENCES "user_details"("user_id")
);
CREATE TABLE IF NOT EXISTS "club_details" (
	"club_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"club_name"	TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "user_register_event_details" (
	"user_id"	INTEGER NOT NULL,
	"event_id"	INTEGER NOT NULL,
	FOREIGN KEY("event_id") REFERENCES "event_details"("event_id"),
	PRIMARY KEY("user_id","event_id"),
	FOREIGN KEY("user_id") REFERENCES "user_details"("user_id")
);
CREATE TABLE IF NOT EXISTS "event_organizer_details" (
	"organizer_id"	INTEGER NOT NULL,
	"event_id"	INTEGER NOT NULL,
	PRIMARY KEY("organizer_id","event_id"),
	FOREIGN KEY("organizer_id") REFERENCES "organizer_details"("organizer_id")
);
CREATE TABLE IF NOT EXISTS "interested_club" (
	"user_id"	INTEGER NOT NULL,
	"club_id"	INTEGER NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "user_details"("user_id"),
	FOREIGN KEY("club_id") REFERENCES "club_details"("club_id"),
	PRIMARY KEY("user_id","club_id")
);
INSERT INTO "event_details" VALUES (1,1,'Introduction Block Chain','2019-09-09','09:09','Auditorium','Technical','Spekaer: Adit Patel
He is blockchain specialist
','https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2018/01/15155312/iStock-667709450.jpg','https://shortdummy.xyz',20,'2019-09-09','false',9,NULL);

COMMIT;
