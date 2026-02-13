/**
 * Dropdown options for product form, derived from Data.json / Product schema.
 * All fields use dropdown only (click to select).
 */
const unique = (arr) => [...new Set(arr)].filter(Boolean).sort();

// From Data.json – unique values per field
export const productCategoryOptions = ["Furniture", "Lighting", "Rug"];
export const productPriceOptions = ["85.00", "59.50", "63.75"];
export const productOnSaleOptions = ["true", "false"];
export const allProductsOptions = ["true", "false"];
export const isProductBestsellerOptions = ["1", "0"];
export const isProductNewOptions = ["yes", "no"];

export const productNameOptions = unique([
  "sofa", "carpat", "lamp", "table", "blue carpet", "Lighting", "chair", "black lamp",
  "copper lamp", "table and chairs", "yellow sofa ", "carpet and sofa", "white lamp",
  "black and white lamp", "cubert", "last carpat", "green carpet", "table and chairs",
]);

export const productColorOneOptions = unique([
  "Teal", "Turquoise", "Black", "White", "Beige", "Bronze", "Navy", "Mustard Yellow",
  "Pink", "Green", "Yellow", "Pink Bronze",
]);
export const productColortwoOptions = ["", "Green", "purple", "Gold", "Brown", "Peach", "White", "Lime Green", "Turquoise"];

// Product IDs: Category + number (Furniture1–7, Rug1–7, Lighting1–7)
const baseIds = [];
["Furniture", "Rug", "Lighting"].forEach((cat) => {
  for (let i = 1; i <= 8; i++) baseIds.push(`${cat}${i}`);
});
export const productIdOptions = baseIds;

// Image URLs from Data.json (unique) – for dropdown label use short slug
const imageUrlsFromData = [
  "https://static.wixstatic.com/media/ea26fd_b146385874514c15ac4907fc2d9e1a9a~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_b146385874514c15ac4907fc2d9e1a9a~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_a3054122eed840088fce718d6b93142b~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_a3054122eed840088fce718d6b93142b~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_aaa5a5c9d576481c833bc9feff12909d~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_aaa5a5c9d576481c833bc9feff12909d~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_4bbf59bd981f4165bc7ed20d9b091aff~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_4bbf59bd981f4165bc7ed20d9b091aff~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_57527ad916414c2181d484ee67d1a360~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_57527ad916414c2181d484ee67d1a360~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_db7cb7be7e2f40b3abbac6476bf1f49f~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_db7cb7be7e2f40b3abbac6476bf1f49f~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_3382c27978064c10aa052f63609cd4b4~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_3382c27978064c10aa052f63609cd4b4~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_900ca045d37a4f05854143331b092821~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_900ca045d37a4f05854143331b092821~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_f72d11f848174f21b08458ac0ddc6f1d~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_f72d11f848174f21b08458ac0ddc6f1d~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_551fe283fb474afcb6888f76a696f9e2~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_551fe283fb474afcb6888f76a696f9e2~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_d746c93540f04fb4ab13f2971d879795~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ea26fd_d746c93540f04fb4ab13f2971d879795~mv2_d_2000_2670_s_2.png",
  "https://static.wixstatic.com/media/ea26fd_30daf48aa70d4cb79e78caf4f0bab2b7~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_30daf48aa70d4cb79e78caf4f0bab2b7~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_c7087f8fa71a469aa7c14962bdc5ef66~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_c7087f8fa71a469aa7c14962bdc5ef66~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_aaeaab02b876460c80e6ac9d49537458~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_aaeaab02b876460c80e6ac9d49537458~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_c162ce059eb745379e7d7eca345f1552~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_c162ce059eb745379e7d7eca345f1552~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_128573cff3954643bc4cabbd54f3c204~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_128573cff3954643bc4cabbd54f3c204~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_1704bc41300b4460be595a36af877d07~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_1704bc41300b4460be595a36af877d07~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_ff171939203640819c77f4dbc98cc7d2~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_ff171939203640819c77f4dbc98cc7d2~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_b7d40c34d8c7443a82672bf5353263e7~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_b7d40c34d8c7443a82672bf5353263e7~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_6316fc32ad874e19a9b6241a772201f6~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_6316fc32ad874e19a9b6241a772201f6~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_d0914ff78d4343668f5835b77d138f80~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_d0914ff78d4343668f5835b77d138f80~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_f72d11f848174f21b08458ac0ddc6f1d~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_f72d11f848174f21b08458ac0ddc6f1d~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_551fe283fb474afcb6888f76a696f9e2~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_551fe283fb474afcb6888f76a696f9e2~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_30daf48aa70d4cb79e78caf4f0bab2b7~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_30daf48aa70d4cb79e78caf4f0bab2b7~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_aed2762f1a264c8d8d68b6d493676760~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,usm_0.66_1.00_0.01/ea26fd_aed2762f1a264c8d8d68b6d493676760~mv2_d_2000_2670_s_2.png",
  "https://static.wixstatic.com/media/ea26fd_1575d5e6e2434e4cadd5da09e65dc166~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ea26fd_1575d5e6e2434e4cadd5da09e65dc166~mv2_d_2000_2670_s_2.png",
  "https://static.wixstatic.com/media/ea26fd_702d7834c4854e6daaf0adbeac22f932~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_702d7834c4854e6daaf0adbeac22f932~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_06b81c90159b45dc9bc151984f50079a~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_06b81c90159b45dc9bc151984f50079a~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_9c59d47a93874c84b43cdc2639e56851~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_9c59d47a93874c84b43cdc2639e56851~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_10d33543bdbb480aae6af0036f282ee3~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_10d33543bdbb480aae6af0036f282ee3~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_cf5389d622b24491b4f72348840f3490~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_cf5389d622b24491b4f72348840f3490~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_70a079c5efe841baba6decf495a65483~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_70a079c5efe841baba6decf495a65483~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_c8f71b8cd22a41b1a0c98b10c3603597~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_c8f71b8cd22a41b1a0c98b10c3603597~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_0f31b224377b4ba7882e2bda566c558f~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_0f31b224377b4ba7882e2bda566c558f~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_e4693c3b12aa4d2e8947bdd621e650a6~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_e4693c3b12aa4d2e8947bdd621e650a6~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_d50f762dfea74121892a5109431171f9~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_d50f762dfea74121892a5109431171f9~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_780f2ff3adfe456ba4ab94a66861c6ad~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_780f2ff3adfe456ba4ab94a66861c6ad~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_9b8a610d8fdf4b5d952f051fc9ab2b4c~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_9b8a610d8fdf4b5d952f051fc9ab2b4c~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_aeb6d1e3f6b24f30857928dadbe16c77~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_aeb6d1e3f6b24f30857928dadbe16c77~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_386cde5cb59b47a0a1c334aaa92b679e~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_386cde5cb59b47a0a1c334aaa92b679e~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_e2396535781b4657afe410b90dfc159a~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_e2396535781b4657afe410b90dfc159a~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_b5db91ba339942fea2c1196970aa657b~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_b5db91ba339942fea2c1196970aa657b~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_73148da898d34919bd2503d79957542c~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_73148da898d34919bd2503d79957542c~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_851e37fb7b124fb28fb232089cb5c2e6~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_851e37fb7b124fb28fb232089cb5c2e6~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_668448f7c4b744798683a230a86f95f0~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_668448f7c4b744798683a230a86f95f0~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_d50f762dfea74121892a5109431171f9~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_d50f762dfea74121892a5109431171f9~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_f74ada6b9de442338ba511929758c2fb~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_90,usm_0.66_1.00_0.01/ea26fd_f74ada6b9de442338ba511929758c2fb~mv2_d_2000_2670_s_2.webp",
  "https://static.wixstatic.com/media/ea26fd_d595dcc8cc15435dbb5e542ece3ee7d6~mv2_d_2000_2670_s_2.png/v1/fill/w_500,h_667,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ea26fd_d595dcc8cc15435dbb5e542ece3ee7d6~mv2_d_2000_2670_s_2.png",
];
export const imageUrlOptions = unique(imageUrlsFromData);

export const productAboutOptions = ["", "—"];
export const productLittleDetailOptions = ["", "Lighting", "—"];
export const productInfoOptions = ["", "—"];
