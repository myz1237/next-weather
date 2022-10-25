import Image from "next/image";
import Link from "next/link";

import HKImage from "../../public/images/hongkong.png";
import LausanneImage from "../../public/images/lausanne.jpeg";
import ParisImage from "../../public/images/paris.jpg";
import ZZImage from "../../public/images/zhengzhou.jpeg";

const places = [
  {
    name: "Paris",
    image: ParisImage,
    url: "/location/paris-2968815",
  },
  {
    name: "Hong Kong SAR",
    image: HKImage,
    url: "/location/hong-kong-1819729",
  },
  {
    name: "Zheng Zhou",
    image: ZZImage,
    url: "/location/zhengzhou-1784658",
  },
  {
    name: "Lausanne",
    image: LausanneImage,
    url: "/location/lausanne-2659994",
  },
];

const FamousPlace = () => {
  return (
    <div className="places">
      <div className="places__row">
        {places.length > 0 &&
          places.map((place, index) => (
            <div className="places__box" key={index}>
              <Link href={place.url}>
                <div>
                  <a>
                    <div className="places__image-wrapper">
                      <Image
                        src={place.image}
                        alt={`${place.name} Image`}
                        layout="fill"
                        objectFit="cover"
                      ></Image>
                    </div>
                  </a>

                  <span>{place.name}</span>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FamousPlace;
