import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ModalToolBar from '../ModalToolBar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 35,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#FF99FF',
  },
  button: {
    textAlign: 'center',
    marginTop: 40,
  },
}));

export default function Top() {
    const classes = useStyles();

    const style = {
       textAlign: 'right',
       padding: '1.5%',
      };


    return (
        <React.Fragment>
        <div className="top">
            <div style={style}>
              <ModalToolBar />
            </div>
            <div className="top-text">
              <h1>Baby's日記</h1>
              <h3>大切な子供との毎日の<br/>出来事を気軽に記録しませんか？</h3>
            </div>
        </div>

        <div className="middle">
            <h2>スマホで簡単にメモ</h2>
            <p>できるようになったことの記録をカレンダー形式で<br/>みやすく表示写真や動画のアップロードもできます。<br/>
            また、ベビーシッターを頼む際に子供の情報、<br/>家のルールなどの共有事項など記入し共有することもできます。<br/>
            我が子の成長を楽しく気軽に記録していこう♪</p>
        </div>

        <div className="bottom">
            <h2>Feature</h2>
            <div className={classes.root}>
                <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>シンプルで気軽にメモ</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>夫婦で共有</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>カレンダー形式で見やすい</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>写真や動画のアップロード</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>ベビーシッターに共有事項を送れる</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                </Grid>
            </div>
                <p>いつでもどこでもスマホひとつで簡単に</p>
                <p>さっそく試してみよう！</p>

                <div className={classes.button}>
                 <a href="#" className="btn-gradient-radius">登録</a>
               </div>
        </div>
        </React.Fragment>
    );
}

