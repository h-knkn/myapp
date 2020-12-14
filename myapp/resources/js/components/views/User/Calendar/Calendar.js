import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuModal from '../../User/Home/MenuModal';
import dayjs from "dayjs";
import {
  GridList,
  Typography
} from "@material-ui/core";
import FullCalendar from '@fullcalendar/react'

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
}));




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

  const opneDialog = () =>{
    const id = e.currentTarget.getAttribute('data-id');
    
  }
  


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