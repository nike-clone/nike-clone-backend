INSERT INTO gender(gender, name)
VALUES ('Male', "남성"), ('Female', "여성"), ('Unisex', "성인공용");

INSERT INTO color(colorCode, name)
VALUES
  ('#eee597', '베이지'),
  ('#000000', '검정색'),
  ('#4b85cf', '파랑색'),
  ('#71553d', '갈색'),
  ('#d5d546', '금색'),
  ('#737373', '회색'),
  ('#429028', '녹색'),
  ('#7f7e26', '쑥색'),
  ('#3e4b72', '남색'),
  ('#dc6a34', '주황색'),
  ('#d73188', '분홍색'),
  ('#6241ab', '보라색'),
  ('#b42519', '빨강색'),
  ('#c4c4c4', '은색'),
  ('#ffffff', '흰색'),
  ('#f4c443', '노란색');


ALTER DATABASE nike_clone CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

INSERT INTO size (id)
VALUES
  (220),
  (225),
  (230),
  (235),
  (240),
  (245),
  (250),
  (255),
  (260),
  (265),
  (270),
  (275),
  (280),
  (285),
  (290),
  (295),
  (300),
  (305),
  (310),
  (320),
  (330),
  (340),
  (350),
  (360),
  (380);


INSERT INTO goods (name, rice, imagePath, genderId, colorId, size)
VALUES 
  (
    '에어 조던 6 레트로',
    50000, 
    'https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/CT8529-141/cd01fbf3-0385-4c77-ae6b-7d04e4d78bdf_primary.jpg?gallery',
    1,
    47,
    250
  );


select price, imagePath, gender.gender, color.colorCode, size.size 
from goods 
  join gender
  on goods.genderId = gender.id 
  join color
  on goods.colorId = color.id
  join size
  on goods.size = size.size;


{
    "name": "나이키 에어 포스 1 로우 레트로",
    "price": 179000,
    "imagePath": "https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/DJ3911-100/25dbab0b-257b-463a-9a02-4d399843cb93_primary.jpg?gallery",
    "gender": "Male",
    "color": "흰색",
    "size": 250
}

