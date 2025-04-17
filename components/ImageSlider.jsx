import { Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { sliderImages } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSharedValue } from "react-native-reanimated";

const ImageSlider = () => {
  const progress = useSharedValue(0);
  return (
    <View>
      <Carousel
        data={sliderImages}
        loop={false}
        autoPlay={true}
        autoPlayInterval={2500}
        width={wp(100)}
        height={hp(25)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 70,
          parallaxAdjacentItemScale: 0.7,
        }}
        onProgressChange={progress}
        renderItem={({ item }) => <ItemCard item={item} />}
      />
    </View>
  );
};

const ItemCard = ({ item }) => {
  return (
    <View style={{ width: wp(100), height: "100%", paddingHorizontal: wp(1) }}>
      <Image
        source={item}
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default ImageSlider;
