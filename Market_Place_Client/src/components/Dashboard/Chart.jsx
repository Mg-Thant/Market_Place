import { Card, Title, LineChart } from "@tremor/react";
import { format } from "date-fns";

const Chart = ({ products }) => {
  // get date last week
  const currentDate = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(currentDate.getDate() - 7);
  const productDailySellRate = {};

  // get product last week
  products.forEach((product) => {
    const productSellDate = new Date(product.createdAt);
    if (productSellDate <= currentDate && productSellDate >= lastWeek) {
      const formatDate = format(new Date(productSellDate), "dd/MM");
      if (!productDailySellRate[formatDate]) {
        productDailySellRate[formatDate] = 0;
      }
      productDailySellRate[formatDate] += 1;
    }
  });

  const chartdata = Object.entries(productDailySellRate).map(([key, value]) => {
    return { year: key, "Product Sell Rate": value };
  });

  return (
    <Card className="mt-3">
      <Title>Product Sell Rates Per Daily</Title>
      <LineChart
        className="mt-6"
        data={chartdata}
        index="year"
        categories={["Product Sell Rate"]}
        colors={["blue"]}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default Chart;
