import { Badge, Card, Flex, Metric, Text } from "@tremor/react";
import React from "react";

const DashboardCard = ({title, count, icon, note }) => {
  return (
    <Card className="cursor-pointer" decoration="top" decorationColor="blue">
      <Flex justifyContent="between" alignItems="center">
        <Text>{title}</Text>
        <Badge deltatype="moderateIncrease" isincreasepositive="true" size="xs" icon={icon}>{note}</Badge>
      </Flex>
      <Metric>{count}</Metric>
    </Card>
  );
};

export default DashboardCard;
