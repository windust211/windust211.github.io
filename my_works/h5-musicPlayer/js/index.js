$(function() {
    var MyMusic = function() {
        this.init();
    };
    MyMusic.prototype = MyMusic.fn = {
        player: null,
        isMuted: false,
        init: function() {
            var _that = this;
            this.lyric();
            this.create();
            this.getSongs(this.play);
            this.click2Next(this)
            this.click2Prev(this);

            $('.icon-play').click(function() {
                _that.playOrPause(_that);
            })
            this.toNextOnEnded();
            this.mute(this);
        },
        url: 'data/dataList.json',
        initNum: 0,
        isPlay: true,
        $songList: $('.song_list'),
        create: function() {
            $('<audio></audio>').appendTo($('.music_list'));
        },
        getSongs: function(callback) {
            var that = this;
            $.ajax({
                url: that.url,
                type: 'get',
                dataType: 'json',
                currentPos: 0,
                success: function(data) {
                    // create Elements dynatically
                    for (var i = 0; i < data.length; i++) {
                        var $li = $('<li><a href="javascript:;" data-href="' + data[i].src + '">' + data[i].name + '</a></li');
                        if (i == that.initNum) {
                            $li.addClass('on');
                        }
                        $li.appendTo(that.$songList);
                    };
                    // play the first by default;
                    callback(that);
                    $('li').click(function() {
                        that.initNum = $(this).index();
                        that.toggleCls(that);
                        that.play(that);
                        // that.toggleCls(that);
                        $('.nowPlaying').html($(this).children().html());
                    });
                }
            });
        },
        play: function(that) {
            $('li').eq(that.initNum).addClass('on').siblings().removeClass('on');
            $('audio').get(0).autoplay = 'autoplay';
            $('audio').attr('src', $('li').eq(that.initNum).find('a').attr('data-href'));

            $('.nowPlaying').html($('li').eq(that.initNum).find('a').html());
            that.toggleCls(that);
            that.lyric();
            // 在切换歌曲的时候，重置歌曲位置；
            $('.lyrics').scrollTop(0);
        },
        prev: function(obj) {
            obj.initNum--;
            if (obj.initNum == -1) {
                obj.initNum = $('li').length - 1;
            };
            obj.play(obj);
            if (obj.isPlay) {
                obj.toggleCls(obj);
            };
        },
        next: function(obj) {
            obj.initNum++;
            if (obj.initNum == $('li').size()) {
                obj.initNum = 0;
            }
            obj.play(obj);
            if (obj.isPlay) {
                obj.toggleCls(obj);
            };
        },
        click2Next: function(obj) {
            $('.icon-forward').click(function() {
                obj.next(obj);
            });
        },
        click2Prev: function(obj) {
            $('.icon-backward').click(function() {
                obj.prev(obj);
            });
        },
        playOrPause: function(obj) {
            obj.isPlay ? $('audio').get(0).play() : $('audio').get(0).pause();
            obj.toggleCls(obj);
        },
        toggleCls: function(obj) {
            !obj.isPlay ? $('.icon-play').removeClass('icon-pause') : $('.icon-play').addClass('icon-pause');
            obj.isPlay = !obj.isPlay;
        },
        toNextOnEnded: function() {
            var that = this;
            $('audio').get(0).onended = function() {
                that.next(that);
                $('.lyrics').scrollTop(0);
            }
        },
        mute: function(obj) {
            // 处理静音；
            obj.player = $('audio').get(0);
            $('#vol').click(function() {
                if (obj.isMuted) {
                    obj.player.muted = false;
                    $(this).removeClass('icon-volume-off').addClass('icon-volume-up');
                } else {
                    obj.player.muted = true;
                    $(this).removeClass('icon-volume-up').addClass('icon-volume-off');
                }
                obj.isMuted = !obj.isMuted;
            });
        }
    };
    // 拓展静态方法；
    MyMusic.extend = function(ext) {
        for (k in ext) {
            MyMusic.prototype[k] = ext[k];
        }
    }
    MyMusic.extend({
        lyric: function() {
            var self = this;
            $.ajax({
                url: this.url,
                type: 'get',
                dataType: 'text',
                success: function(data) {
                    //  resend the request
                    var data = JSON.parse(data);
                    $.ajax({
                        url: data[self.initNum].lrc,
                        type: 'get',
                        dataType: 'text',
                        success(data) {
                            //  handle the lyrics then render to html
                            var data = data.replace(/(\[.*\].*)/g, '<p>$1</p>');
                            $('.lyrics').html(data);
                            // store it in an array to match the index
                            var content = [];
                            // get clientHeight;
                            var clientHeight = $('.lyrics').outerHeight();
                            $.each($('.lyrics p'), function(index, txt) {

                                txt.style.position = 'relative';
                                txt.style.top = 10 * index + 'px';
                                var toArr = $(this).html().replace(/\[(.*)\]/g, '$1*').split('*');
                                // convert timestamp to seconds
                                toArr[0] = Number(toArr[0].split(':')[0] * 60) + Number(toArr[0].split(':')[1]);
                                if (isNaN(toArr[0])) {
                                    toArr[0] = 0;
                                };
                                content.push(toArr[0]);
                                $(this).html(toArr[1]);
                            });

                            $('audio')[0].ontimeupdate = function() {
                                var total_time = $('audio')[0].duration;
                                var cur_time = this.currentTime;
                                var cur_len = cur_time / total_time * 100;
                                var clientHeight = $('.lyrics').outerHeight();
                                var scrollHeight = $('.lyrics').get(0).scrollHeight;
                                var scrollTop = $('.lyrics').scrollTop();
                                $('[type="range"]').val(cur_len);
                                for (var i = 0; i < content.length; i++) {
                                    var curTop = $('.lyrics p').eq(i).offset().top;
                                    // 高亮当前歌词行；
                                    if (this.currentTime >= content[i] && this.currentTime < content[i + 1]) {
                                        $('.lyrics p').eq(i).addClass('current').siblings().removeClass('current');
                                    }
                                    // 歌词根据播滚动显示
                                    if ($('p.current').length && $('p.current').offset().top > clientHeight / 2 && scrollTop + clientHeight <= scrollHeight) {
                                        $('.lyrics').scrollTop($('.lyrics').scrollTop() + 10);
                                        $('.lyrics').animate({
                                            scrollTop: $('.lyrics').scrollTop() + 10
                                        }, 100);
                                    }
                                };
                            }
                        }
                    })
                }
            })
        },
        switchPlayOrder: function() {
        }
    });
    // 初始化调用
    new MyMusic();
})