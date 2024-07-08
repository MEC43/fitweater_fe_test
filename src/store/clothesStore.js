import { create } from "zustand";

const useClothesStore = create(() => ({
  tops: {
    "반팔 티셔츠": "img/clothes/short_sleeve_T.svg",
    티셔츠: "티셔츠 이미지 링크",
    민소매: "img/clothes/short_sleeve_T.svg",
    맨투맨: "맨투맨 이미지 링크",
    니트: "니트 이미지 링크",
    "반팔 후드티": "후드티 이미지 링크",
    후드티: "후드티 이미지 링크",
    "반팔 셔츠": "반팔 셔츠 이미지 링크",
    셔츠: "셔츠 이미지 링크",
    "반팔 블라우스": "img/clothes/short_sleeve_blouse.svg",
    블라우스: "img/clothes/short_sleeve_blouse.svg",
  },
  bottoms: {
    청바지: "청바지 이미지 링크",
    청반바지: "img/clothes/short_jean.svg",
    슬랙스: "슬랙스 이미지 링크",
    "트레이닝 바지": "트레이닝 바지 이미지 링크",
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
    롱패딩: "롱패딩 이미지 링크",
    숏패딩: "숏패딩 이미지 링크",
    조끼: "조끼 이미지 링크",
  },
  dresses: {
    원피스: "원피스 이미지 링크",
  },
}));

export default useClothesStore;
