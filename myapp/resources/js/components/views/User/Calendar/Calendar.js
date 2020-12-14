import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuModal from '../../User/Home/MenuModal';

import FullCalendar from '@fullcalendar/react';
import DatePicker, { registerLocale } from "react-datepicker";

// DatePickerのロケールを設定に使用。
import ja from 'date-fns/locale/ja'

// FullCalendarで週表示を可能にするモジュール。
import timeGridPlugin from '@fullcalendar/timegrid'

// FullCalendarで月表示を可能にするモジュール。
import dayGridPlugin from '@fullcalendar/daygrid'

// FullCalendarで日付や時間が選択できるようになるモジュール。
import interactionPlugin from '@fullcalendar/interaction'

const useStyles = makeStyles((theme) => ({
  logoutButton: {
    margin: 'auto',
    backgroundColor: '#FFCC66',
    width: '10%',
    display:'block',
    margin: '0 0 0 auto',
    '&:hover': {
      background: "#FFCC66",
      opacity: 0.6,
   },
  },
  displayFlex: {
    display:'flex',
    alignItems:'flex-start',
  },
  cover: {
    opacity: 0,
    visibility: 'hidden',
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.3)'
  },
  form: {
    opacity: 0,
    visibility: 'hidden',
    position: 'fixed',
    top: '30%',
    left: '40%',
    fontWeight: 'bold',
    background: 'rgba(255, 255, 255)',
    width: '400px',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  inView: { // cover, formを表示する時に適用するStyle。
    opacity: 1,
    visibility: 'visible'
  },
}));

registerLocale('ja', ja)



// ログアウト
const logoutButton = (e) => {
  e.preventDefault()
  const data = localStorage.getItem('access_token');
  console.log(data);
  const res = confirm("ログアウトしますか？");
  if( res == true ) {
    localStorage.clear();
    props.history.push('/');
  }
  else {
    return;
  }
}

const Calendar = () => {
  const classes = useStyles();

  const [inputTitle, setInputTitle] = useState('') // フォームに入力されたタイトル。
  const [inputStart, setInputStart] = useState(new Date) // イベントの開始時刻。
  const [inputEnd, setInputEnd] = useState(new Date) // イベントの終了時刻。
  const [inView, setInView] = useState(false) // イベント登録フォームの表示有無。(trueなら表示する。)
  
  


    return(
        <>
          <h1 className="text1">カレンダー</h1>
          <div className={classes.displayFlex}>
          <MenuModal />
          <Button className={classes.logoutButton} onClick={logoutButton}>
            ログアウト
          </Button>
          </div>
  
          <div className="calendar-container">
          <FullCalendar
            locale="ja"　// ロケール設定。
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // 週表示、月表示、日付等のクリックを可能にするプラグインを設定。
            initialView="dayGridMonth" // カレンダーの初期表示設定。この場合、週表示。
            slotDuration="00:30:00"　// 週表示した時の時間軸の単位。
            selectable={true} // 日付選択を可能にする。interactionPluginが有効になっている場合のみ。
            data-id={row.id}
            businessHours={{ // ビジネス時間の設定。
              daysOfWeek: [1, 2, 3, 4, 5], // 0:日曜 〜 7:土曜
              startTime: '00:00',
              endTIme: '24:00'
            }} 
            weekends={true} // 週末を強調表示する。
            titleFormat={{ // タイトルのフォーマット。(詳細は後述。※1)
              year: 'numeric',
              month: 'short'
            }}
          />
        </div>
    
     
        </>
    )
}


export default Calendar