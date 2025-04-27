import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";
import { useNavigate } from "react-router-dom";

const WidgetsDropdown = ({ dashboardCounting, className }) => {
  const widgetChartRef1 = useRef(null);
  const widgetChartRef2 = useRef(null);
  const navigate = useNavigate();

  console.log("dashboardCounting", dashboardCounting);

  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={<>{dashboardCounting?.customerCount}</>}
          title="Customers"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/customer/all")}
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="text-white p-0"
              >
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="success"
          value={<>{dashboardCounting?.scrapCount}</>}
          title="Scraps"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/scrap/all")}
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-primary"),
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={<>{dashboardCounting?.contactCount || 0}</>}
          title="Contacts"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="text-white p-0"
              >
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "July",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,100,.55)",
                    data: [100, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                // interaction: { mode: "none" }, 
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false, 
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  );
};

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
};

export default WidgetsDropdown;

