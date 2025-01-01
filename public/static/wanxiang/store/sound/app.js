document.addEventListener('DOMContentLoaded', function () {
    // 创建多个 WaveSurfer 实例
    var wavesurfers = [];

    // 配置和控制每个播放器
    function setupWaveSurfer(index) {
        var containerId = 'waveform' + index;
        var playlistId = 'playlist' + index;
        var playPauseId = 'playPause' + index;
        var progressWaveElementId = 'waveform' + index + ' wave wave';

        var wavesurfer = Object.create(WaveSurfer);

        wavesurfer.init({
            container: '#' + containerId,
            waveColor: '#428bca',
            progressColor: '#31708f',
            height: 50,
            barWidth: 3
        });

        var progressWaveElement = document.querySelector('#' + progressWaveElementId);
        progressWaveElement.style.display = 'none';

        var playPause = document.querySelector('#' + playPauseId);
        playPause.addEventListener('click', function () {
            stopAllWaveSurfers();  // 停止其他播放器
            if (wavesurfer.isPlaying()) {
                progressWaveElement.style.display = 'none';
            } else {
                progressWaveElement.style.display = 'block';
            }
            wavesurfer.playPause();
        });

        wavesurfer.on('play', function () {
            document.querySelector('#' + playPauseId + ' #play').style.display = 'none';
            document.querySelector('#' + playPauseId + ' #pause').style.display = '';
        });

        wavesurfer.on('pause', function () {
            document.querySelector('#' + playPauseId + ' #play').style.display = '';
            document.querySelector('#' + playPauseId + ' #pause').style.display = 'none';
        });

        var links = document.querySelectorAll('#' + playlistId + ' a');
        var currentTrack = 0;

        var setCurrentSong = function (index) {
            links[currentTrack].classList.remove('active');
            currentTrack = index;
            links[currentTrack].classList.add('active');
            wavesurfer.load(links[currentTrack].href);
        };

        Array.prototype.forEach.call(links, function (link, index) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                stopAllWaveSurfers();  // 停止其他播放器
                setCurrentSong(index);
                progressWaveElement.style.display = 'block';
            });
        });

        wavesurfer.on('ready', function () {
            // 在这里不执行自动播放
        });

        wavesurfer.on('finish', function () {
            setCurrentSong((currentTrack + 1) % links.length);
            progressWaveElement.style.display = 'none';
        });

        setCurrentSong(currentTrack);
        wavesurfers.push(wavesurfer);

        // 每加载5个播放器后暂停2秒
        if (index % 4 === 0) {
            setTimeout(function () {
                // 继续加载下一个播放器
            }, 2000); // 2秒延迟
        }
    }

    // 停止所有播放器
    function stopAllWaveSurfers() {
        wavesurfers.forEach(function (wavesurfer) {
            if (wavesurfer.isPlaying()) {
                wavesurfer.stop();
            }
        });
    }

    // 使用循环动态设置播放器
    var numPlayers = 8; // 假设有10个播放器
    for (var i = 1; i <= numPlayers; i++) {
        setupWaveSurfer(i);
    }
});
