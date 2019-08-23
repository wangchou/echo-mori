-- migrate:up

create TABLE user(
  id int not null PRIMARY key AUTO_INCREMENT,
  created_at DATETIME default CURRENT_TIMESTAMP,
  name text,
  account_name text,
  password text
);
create table sentence_set(
  id int not null PRIMARY key AUTO_INCREMENT,
  created_at DATETIME default CURRENT_TIMESTAMP,

  fk_author_id int default 0 REFERENCES User ON DELETE SET DEFAULT
);
create table sentence(
  id int not null PRIMARY key AUTO_INCREMENT,
  created_at DATETIME default CURRENT_TIMESTAMP,

  fk_author_id int default 0 REFERENCES User  ON DELETE SET DEFAULT,
  fk_sentence_set_id int default 0 REFERENCES sentence_set ON DELETE SET DEFAULT,
  sentence text,
  language text,
  difficulty int
);

create Table tag(
  id int not null PRIMARY key AUTO_INCREMENT,
  created_at DATETIME  default CURRENT_TIMESTAMP,

  fk_author_id int default 0 REFERENCES user ON DELETE SET DEFAULT
);

create Table sentence_tag(
  id int not null PRIMARY key AUTO_INCREMENT,
  created_at DATETIME  default CURRENT_TIMESTAMP,

  fk_sentence_id int not null REFERENCES sentence ON DELETE CASCADE,
  fk_tag_id int not null REFERENCES tag ON DELETE CASCADE,
  fk_author_id int default 0 REFERENCES user ON DELETE SET DEFAULT
);

create TABLE game_record(
  id int not null PRIMARY key AUTO_INCREMENT,
  created_at DATETIME  default CURRENT_TIMESTAMP,

  fk_user_id int not null REFERENCES user,
  fk_sentence_set_id int not null REFERENCES sentence_set,
  total_score int
);

create TABLE game_record_detail(
  id int not null PRIMARY key AUTO_INCREMENT,
  created_at DATETIME  default CURRENT_TIMESTAMP,

  fk_record_id int not NULL REFERENCES game_record ON DELETE CASCADE,
  fk_sentence_id int not null REFERENCES sentence ON DELETE NO ACTION,
  score int
);


create TABLE comment(
  id int not null PRIMARY key AUTO_INCREMENT,
  created_at DATETIME  default CURRENT_TIMESTAMP,

  fk_author_id int DEFAULT 0 REFERENCES User on DELETE SET DEFAULT,
  message text,
  ip text
);


-- migrate:down
