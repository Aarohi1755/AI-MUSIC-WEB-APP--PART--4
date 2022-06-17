Believer_song = "";
CheapThrills_song = "";
leftWrist_x = 0;
leftWristY = 0;
rightWrist_x = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_believer = "";
song1_status = "";
song2_status = "";
song="";

function setup(){
    canvas = createCanvas(900, 700);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload(){
    CheapThrills_song = loadSound("music.mp3.mp3");
    Believer_song = loadSound("Believer.mp3");
}

function draw(){
    image(video, 0, 0, 900, 700);
song1_status = Believer_song.isPlaying();
song2_status = CheapThrills_song.isPlaying();
    fill("#0df4fc");
    stroke("#fa9507");
    
    

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        Believer_song.stop()
        if(song1_status == false)
        {
            CheapThrills_song.play()
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: CheapThrills";
        }
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        CheapThrills_song.stop()
        if(song2_status == false)
        {
            Believer_song.play()
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Believer";
        }
    }
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x +" leftWrist_y = "+ leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x +" rightWrist_y = "+ rightWrist_y);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

