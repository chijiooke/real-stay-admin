import dayjs from "dayjs";
import {
  StatsItem,
  StatsResponse,
} from "../endpoints/analytics/analytics-types";
import { ApiResponse } from "../endpoints/api";

export function getStatsArray(
  response: ApiResponse<StatsResponse>,
  type: "monthly" | "daily" = "monthly"
): StatsItem[] {
  if (!response.success || !response.data) return [];

  let statsArray: StatsItem[] = Object.values(response.data);
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let result;
  if (type === "monthly") {
    result = statsArray.sort(
      (a, b) => monthOrder.indexOf(a.key) - monthOrder.indexOf(b.key)
    );
  } else if (type === "daily") {
    result = statsArray
      .sort((a, b) => dayjs(a.key).unix() - dayjs(b.key).unix()) // sort by date
      .map((data) => {
        const format = dayjs(data.key).format("DD MMM, YYYY");

        return {
          ...data,
          key: format, // format after sorting
        };
      });
  }

  console.log({ result });
  return result;
}
