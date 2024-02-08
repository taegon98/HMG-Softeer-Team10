import classNames from 'classnames';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ReservationComplete() {
  const username = 'user';
  const reservDate = '2024년 1월 11일';
  const reservTime = '10:00';
  const pickupDate = '2024년 1월 14일';
  const pickupTime = '17:00';
  const carSellName = 'Genesis G80';
  const carNumber = '12가 3456';
  const shopName = '블루헨즈 인천공항점';
  const shopAddress = '인천 중구 용유서로 172번길';
  const shopPhoneNumber = '010-1234-1234';
  const request = '에어컨이 고장났어요.';
  const notSelected = true;

  return (
    <>
      <Header />
      <div className={classNames('content', 'reservation-complete')}>
        <div className={classNames('title')}>
          <span className={classNames('title--text')}>Reservation</span>
        </div>

        <div className={classNames('info')}>
          <div>
            <span className={classNames('info--name')}>{username}</span>
            <span>님, 다음 내용으로 예약 되었습니다.</span>
          </div>
          <div>
            <span>예약일 </span>
            <span className={classNames('outline')}>{reservDate}</span>
            <span>까지 센터로 방문해주세요.</span>
          </div>
        </div>

        <div className={classNames('row')}>
          <div className={classNames('row--title')}>에약일</div>
          <div className={classNames('row__content')}>
            <div className={classNames('content__detail')}>
              <span className={classNames('content__detail--name', 'outline')}>센터 방문</span>
              <span>{`${reservDate} ${reservTime}`}</span>
            </div>
            <div className={classNames('content__detail')}>
              <span className={classNames('content__detail--name', 'outline')}>픽업 시간</span>
              <span>{`${pickupDate} ${pickupTime}`}</span>
            </div>
          </div>
        </div>

        <div className={classNames('row--seperator')} />

        <div className={classNames('row')}>
          <div className={classNames('row--title')}>에약 차량</div>
          <div className={classNames('row__content')}>
            <div className={classNames('content__detail')}>
              <span className={classNames('content__detail--name', 'outline')}>차종</span>
              <span>{carSellName}</span>
            </div>
            <div className={classNames('content__detail')}>
              <span className={classNames('content__detail--name', 'outline')}>차량 번호</span>
              <span>{carNumber}</span>
            </div>
          </div>
        </div>

        <div className={classNames('row--seperator')} />

        <div className={classNames('row')}>
          <div className={classNames('row--title')}>방문 센터</div>
          <div className={classNames('row__content')}>
            <div className={classNames('content__detail')}>
              <span className={classNames('content__detail--name', 'outline')}>지점명</span>
              <span>{shopName}</span>
            </div>
            <div className={classNames('content__detail')}>
              <span className={classNames('content__detail--name', 'outline')}>주소</span>
              <span>{shopAddress}</span>
            </div>
            <div className={classNames('content__detail')}>
              <span className={classNames('content__detail--name', 'outline')}>연락처</span>
              <span>{shopPhoneNumber}</span>
            </div>
          </div>
        </div>

        <div className={classNames('row--seperator')} />

        <div className={classNames('row')}>
          <div className={classNames('row--title')}>선택 서비스</div>
          <div className={classNames('row__content')}>
            <div className={classNames('content__line')}>
              <span>각종 오일 및 호스 상태</span>
              <span className={classNames({ notSelected })}>배터리 상태 및 충전 전압</span>
            </div>
            <div className={classNames('content__line')}>
              <span className={classNames({ notSelected })}>엔진 구동 상태</span>
              <span>엔진 냉각수</span>
              <span className={classNames({ notSelected })}>에어클리너 점검</span>
            </div>
            <div className={classNames('content__line')}>
              <span>하체충격 및 손상 여부</span>
              <span className={classNames({ notSelected })}>브레이크패드 및 라이닝 마모</span>
            </div>
            <div className={classNames('content__line')}>
              <span>각종 등화 장치 점검</span>
              <span>엔진 미션 마운트</span>
              <span>서스펜션 뉴계토우 점검</span>
            </div>
            <div className={classNames('content__line')}>
              <span className={classNames({ notSelected })}>스테빌라이저 및 드라이버 샤프트</span>
              <span>스캐너 고장코드 진단</span>
            </div>
            <div className={classNames('content__line')}>
              <span className={classNames({ notSelected })}>에어컨 및 히터 작동 생태</span>
              <span>타이어 공기압 및 마모도</span>
              <span className={classNames({ notSelected })}>에어컨 필터</span>
            </div>
          </div>
        </div>

        <div className={classNames('row')}>
          <div className={classNames('row--title')}>요청 사항</div>
          <span>{request}</span>
        </div>

        <button className={classNames('button')}>예약내역 확인하기</button>
      </div>
      <Footer />
    </>
  );
}