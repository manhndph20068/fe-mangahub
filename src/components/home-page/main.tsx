"use client";
import { Row, Col, Layout, FloatButton } from "antd";
import RecommnendComics from "./recommend.comics";
import RecentUpdateComics from "./recent.update.comics";
import TopComponent from "./top/top.component";
import VisitedComponent from "./visited/visited.component";
import { useSelector } from "@/src/lib/redux";

interface IProps {
  RecommendComics: ICommics[];
  RecentUpdateComicsData: IModelPaginate<ICommics>;
  DataTopOfMonth: ICommics[];
  DataTopOfWeek: ICommics[];
  DataTopOfDaily: ICommics[];
}

const Main = (props: IProps) => {
  const {
    RecommendComics,
    RecentUpdateComicsData,
    DataTopOfMonth,
    DataTopOfWeek,
    DataTopOfDaily,
  } = props;

  const listComicsVisited = useSelector((state) => state.visitedComics);

  return (
    <>
      <Row gutter={[0, 15]} justify="center" style={{ marginBottom: "10px" }}>
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 23 }}
          lg={{ span: 22 }}
          xl={{ span: 19 }}
          xxl={{ span: 17 }}
        >
          <RecommnendComics RecommendComics={RecommendComics} />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 23 }}
          lg={{ span: 15 }}
          xl={{ span: 13 }}
          xxl={{ span: 11 }}
        >
          <RecentUpdateComics data={RecentUpdateComicsData} />
        </Col>
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 23 }}
          lg={{ span: 7 }}
          xl={{ span: 6 }}
          xxl={{ span: 6 }}
        >
          {listComicsVisited && listComicsVisited.comics.length > 0 && (
            <VisitedComponent listComicsVisited={listComicsVisited} />
          )}

          <TopComponent
            DataTopOfMonth={DataTopOfMonth}
            DataTopOfWeek={DataTopOfWeek}
            DataTopOfDaily={DataTopOfDaily}
          />
        </Col>
        <Col
          xs={{ span: 0 }}
          sm={{ span: 0 }}
          md={{ span: 0 }}
          lg={{ span: 0 }}
          xl={{ span: 19 }}
          xxl={{ span: 17 }}
        >
          <FloatButton.BackTop />
        </Col>
      </Row>
    </>
  );
};
export default Main;
