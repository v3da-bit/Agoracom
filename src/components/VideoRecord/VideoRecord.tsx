'use client';

import React, { Component, useEffect, useState } from 'react';
import { ZiggeoRecorder } from 'react-ziggeo';

export default function VideoRecord({record}:any) {

    const API_KEY = '256ac21e562ea0c33971425618400db5';
    const VIDEO_TOKEN = '';
    const [recorder, setRecorder] = useState(null);
    const [updateInstance, setUpdateInstance] = useState(false);
    useEffect(() => {
        if (recorder) {
            // Should be a new instance
            setUpdateInstance(false);
        }
    }, [recorder]);
    const handleSomeAction = () => {
        if (recorder) {
            // Whenever we will set as true, we will get a new recorder instance
            setUpdateInstance(true);
        }
    }
    const playing = () => {
        console.log('it\'s playing, your action here');
    };

    const paused = () => {
        console.log('it\'s paused, your action when pause');
    };

    const playerEnded = () => {
        console.log('Player ended');
    };

    const playerAttached = () => {
        console.log('Player attached');
    };

    const playerLoaded = () => {
        console.log('Player loaded');
    };

    const playerSeek = () => {
        console.log('Player seeking');
    };

    const recorderError = () => {
        console.log('Recorder error');
    };

    const recorderManuallySubmitted = () => {
        console.log('Recorder onRecorderManuallySubmitted');
    };

    const recorderRecording = () => {
        console.log('Recorder onRecorderRecording');
    };

    const recorderUploaded = (e: any) => {
        console.log('Recorder onRecorderUploaded', e);
    };

    const recorderUploadSelected = () => {
        console.log('Recorder onRecorderUploadSelected');
    };

    const recorderUploading = () => {
        console.log('Recorder onRecorderUploading');
    };

    const recorderRerecord = () => {
        console.log('Recorder onRecorderRerecord');
    };

    const recorderCountdown = () => {
        console.log('Recorder onRecorderCountdown');
    };

    const recorderRecordingProgress = () => {
        console.log('Recorder onRecorderRecordingProgress');
    };

    const recorderUploadProgress = () => {
        console.log('Recorder onRecorderUploadProgress');
    };

    const recorderAccessForbidden = () => {
        console.log('Recorder recorderAccessForbidden');
    };

    const recorderAccessGranted = () => {
        console.log('Recorder onRecorderAccessGranted');
    };

    const recorderCameraUnresponsive = () => {
        console.log('Recorder onRecorderCameraUnresponsive');
    };

    const recorderVerified = (e: any) => {
        console.log('Recorder onRecorderVerified', e);
    };

    const recorderNoCamera = () => {
        console.log('Recorder onRecorderNoCamera');
    };

    const recorderNoMicrophone = () => {
        console.log('Recorder onRecorderNoMicrophone');
    };
    console.log(record);
    

    return (
        <section className="recorder-page">
            <ZiggeoRecorder
                apiKey={API_KEY}
                video={VIDEO_TOKEN}
                height={180}
                width={320}
                allowrecord={record}
                onPlaying={playing}
                onPaused={paused}
                onEnded={playerEnded}
                onAttached={playerAttached}
                onLoaded={playerLoaded}
                onSeek={playerSeek}
                onError={recorderError}
                onManuallySubmitted={recorderManuallySubmitted}
                onUploaded={recorderUploaded}
                onUploadSelected={recorderUploadSelected}
                onRecording={recorderRecording}
                onUploading={recorderUploading}
                onRerecord={recorderRerecord}
                onCountdown={recorderCountdown}
                onRecordingProgress={recorderRecordingProgress}
                onUploadProgress={recorderUploadProgress}
                onAccessForbidden={recorderAccessForbidden}
                onAccessGranted={recorderAccessGranted}
                onCameraUnresponsive={recorderCameraUnresponsive}
                onNoCamera={recorderNoCamera}
                onNoMicrophone={recorderNoMicrophone}
                onVerified={recorderVerified}
            />
        </section>
    );

}