import React from "react";
import Counter from "../context/caounter";
import { Card } from "@/components/ui/card";

type AnalyticsCard = {
  label: string;
  value: number | string;
  growth?: string;
  icon: React.ReactNode;
  bg?: string;
  isPercentage?: boolean;
  suffix?: string;
};

type AnalyticsCardListProps = {
  analytics: AnalyticsCard[];
};

const AnalyticsCardList: React.FC<AnalyticsCardListProps> = ({ analytics }) => (
  <div className="dark:border-gray-100">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
      {analytics.map((item, i) => (
        <Card
          key={i}
          className={`flex flex-col justify-between rounded-lg p-4 h-auto ${
            item.bg ?? ""
          } shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-600 shadow">
                  {item.icon}
                </div>
              </div>
              <div className="mx-2">
                <div className="text-2xl font-bold text-dark">
                  {typeof item.value === "number" ? (
                    <>
                      <Counter
                        value={item.value}
                        decimals={item.isPercentage ? 1 : 1}
                        format={(val) =>
                          item.isPercentage
                            ? `${val.toFixed(1)}%`
                            : val.toLocaleString("id-ID", {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1,
                              })
                        }
                      />
                      {item.suffix && (
                        <span className="ml-1">{item.suffix}</span>
                      )}
                    </>
                  ) : (
                    item.value
                  )}
                </div>
                <div className="text-gray-400 text-sm">{item.label}</div>
              </div>
            </div>
            <div className="text-sm font-medium text-textDark">
              {item.growth}
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default AnalyticsCardList;
