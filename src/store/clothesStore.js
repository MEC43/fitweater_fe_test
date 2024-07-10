import { create } from "zustand";

const useClothesStore = create(() => ({
  tops: {
    "반팔 티셔츠": "img/clothes/short_sleeve_T.svg",
    티셔츠: "img/clothes/mantoman.svg",
    민소매: "img/clothes/sleeveless.svg",
    맨투맨: "img/clothes/mantoman.svg",
    니트: "img/clothes/mantoman.svg",
    "반팔 후드티": "img/clothes/aa.svg",
    후드티: "img/clothes/aa.svg",
    "반팔 셔츠": "img/clothes/short_sleeve_shirt.svg",
    셔츠: "img/clothes/shrit.svg",
    "반팔 블라우스": "img/clothes/short_sleeve_blouse.svg",
    블라우스: "img/clothes/long_blouse.svg",
  },
  bottoms: {
    청바지: "img/clothes/long_jean.svg",
    청반바지: "img/clothes/short_jean.svg",
    슬랙스: "img/clothes/long_pants.svg",
    긴바지: "img/clothes/long_pants.svg",
    "트레이닝 바지": "img/clothes/long_pants.svg",
    반바지: "img/clothes/short_pants.svg",
    롱스커트: "img/clothes/long_skirt.svg",
    미니스커트: "img/clothes/mini_skirt.svg",
    스커트: "img/clothes/mini_skirt.svg",
  },
  outers: {
    가디건: "img/clothes/cardigan.svg",
    카디건: "img/clothes/cardigan.svg",
    자켓: "img/clothes/jacket.svg",
    코트: "코트 이미지 링크",
    집업: "집업 이미지 링크",
    롱패딩: "img/clothes/long_padding.svg",
    숏패딩: "img/clothes/short_padding.svg",
    조끼: "img/clothes/vest.svg",
  },
  dresses: {
    원피스: "원피스 이미지 링크",
  },
}));

export default useClothesStore;
