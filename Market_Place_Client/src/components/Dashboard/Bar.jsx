import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";
import { GifIcon } from "@heroicons/react/24/outline";

const Bar = ({ products }) => {
  const countCategory = {};

  products.forEach((product) => {
    const productCategory = product.category;
    if (!countCategory[productCategory]) {
      countCategory[productCategory] = 0;
    }
    countCategory[productCategory] += 1;
  });

  const data = Object.entries(countCategory).map(([key, value]) => {
    return {
      name: key.toUpperCase().replaceAll("_", " "),
      value,
    };
  });

  return (
    <Card className="w-full my-4">
      <Title>Prouduct Counts By Categories</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Category</Bold>
        </Text>
        <Text>
          <Bold>Counts</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2" />
    </Card>
  );
};

export default Bar;
