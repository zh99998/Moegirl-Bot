    function onRequest(request, sender, callback) {
        if (request.method == "getLocalStorage")
            callback({ data: localStorage[request.key] });
        if (request.method == "setLocalStorage") {
            localStorage[request.key] = request.content;
            callback({});
        }
    };

    chrome.extension.onRequest.addListener(onRequest);

    if (typeof (localStorage["identifier"]) == 'undefined')
        localStorage["identifier"] = '';
    if (typeof (localStorage["processedPostTitle"]) == 'undefined')
        localStorage["processedPostTitle"] = '';
    var identifier = localStorage["identifier"];

    var GB2312UnicodeConverter = {
        ToUnicodeWide: function (str) {
            return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\\\\\\\u');
        }
  , ToUnicode: function (str) {
      return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
  }
    };

    setInterval(function () {
        identifier = localStorage["identifier"];
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var recentChanges = ajax.responseXML;
                var latestPageId = recentChanges.getElementsByTagName('rc')[0].getAttribute('pageid');
                var actualPageUrl = 'http://wiki.moegirl.org/wiki?curid=' + latestPageId;
                var pageXML;
                var ajaxPage = new XMLHttpRequest();
                ajaxPage.onreadystatechange = function () {
                    if (ajaxPage.readyState == 4 && ajaxPage.status == 200) {
                        pageXML = ajaxPage.responseXML;
                        var pageTitle = pageXML.getElementsByTagName('page')[0].getAttribute('title');
                        var pageContentBrief = pageXML.getElementsByTagName('');
                        var timeIndctr = Math.floor((Math.random() * 100000000000)).toString();
                        for (var i = 0; timeIndctr.length != 11; i++)
                            timeIndctr = Math.floor((Math.random() * 100000000000)).toString();
                        var preEncodeString = '条目： #' + pageTitle + '\\n\\n' + '更新了哦！不来看看么？\\n' + '传送在此：\\n\\n→_→ ' + actualPageUrl;
                        var encodedString = encodeURIComponent(preEncodeString);

                        var ajaxPOSTLink = new XMLHttpRequest();
                        ajaxPOSTLink.onreadystatechange = function () {
                            if (ajaxPOSTLink.readyState == 4 && ajaxPOSTLink.status == 400) {
                                var arr = eval('//' + ajaxPOSTLink.responseText);
                                localStorage["identifier"] = arr[0][0][4][1];
                            }
                            else if (ajaxPOSTLink.readyState == 4 && ajaxPOSTLink.status == 200) {
                                if (pageTitle != localStorage["processedPostTitle"] && pageTitle != null && latestPageId != '0') {
                                    var arr = eval('//' + ajaxPOSTLink.responseText);
                                    var linkTitle, linkText, thumbnailPicURL;
                                    if(arr[0][1][2][1] != undefined){
                                        linkTitle = arr[0][1][2][1][3];
                                        linkText = arr[0][1][2][1][21];
                                        thumbnailPicURL = arr[0][1][2][0][5][1];
                                    }
                                    else if (arr[0][1][2][0] != undefined) {
                                        linkTitle = arr[0][1][2][0][3];
                                        linkText = arr[0][1][2][0][21];
                                        thumbnailPicURL = '';
                                    }
                                    var preLinkTitleUTF8Wide = GB2312UnicodeConverter.ToUnicodeWide(linkTitle) + '\\\\\\';
                                    var re = /%3a/gi; var linkTitleUTF8Wide = preLinkTitleUTF8Wide.replace(re, ":");
                                    re = /%20/gi; linkTitleUTF8Wide = linkTitleUTF8Wide.replace(re, " ");
                                    re = /%5b/gi; linkTitleUTF8Wide = linkTitleUTF8Wide.replace(re, "[");
                                    re = /%5d/gi; linkTitleUTF8Wide = linkTitleUTF8Wide.replace(re, "]");
                                    re = /%7e/gi; linkTitleUTF8Wide = linkTitleUTF8Wide.replace(re, "~");
                                    re = /%3b/gi; linkTitleUTF8Wide = linkTitleUTF8Wide.replace(re, ";");
                                    var preLinkTextUTF8Wide = GB2312UnicodeConverter.ToUnicodeWide(linkText) + '\\\\\\';
                                    re = /%3a/gi; var linkTextUTF8Wide = preLinkTextUTF8Wide.replace(re, ":");
                                    re = /%20/gi; linkTextUTF8Wide = linkTextUTF8Wide.replace(re, " ");
                                    re = /%5b/gi; linkTextUTF8Wide = linkTextUTF8Wide.replace(re, "[");
                                    re = /%5d/gi; linkTextUTF8Wide = linkTextUTF8Wide.replace(re, "]");
                                    re = /%7e/gi; linkTextUTF8Wide = linkTextUTF8Wide.replace(re, "~");
                                    re = /%3b/gi; linkTextUTF8Wide = linkTextUTF8Wide.replace(re, ";");
                                    var preLinkTitleUTF8 = GB2312UnicodeConverter.ToUnicode(linkTitle);
                                    re = /%3a/gi; var linkTitleUTF8 = preLinkTitleUTF8.replace(re, ":");
                                    re = /%20/gi; linkTitleUTF8 = linkTitleUTF8.replace(re, " ");
                                    re = /%5b/gi; linkTitleUTF8 = linkTitleUTF8.replace(re, "[");
                                    re = /%5d/gi; linkTitleUTF8 = linkTitleUTF8.replace(re, "]");
                                    re = /%7e/gi; linkTitleUTF8 = linkTitleUTF8.replace(re, "~");
                                    re = /%3b/gi; linkTitleUTF8 = linkTitleUTF8.replace(re, ";");
                                    var preLinkTextUTF8 = GB2312UnicodeConverter.ToUnicode(linkText);
                                    re = /%3a/gi; var linkTextUTF8 = preLinkTextUTF8.replace(re, ":");
                                    re = /%20/gi; linkTextUTF8 = linkTextUTF8.replace(re, " ");
                                    re = /%5b/gi; linkTextUTF8 = linkTextUTF8.replace(re, "[");
                                    re = /%5d/gi; linkTextUTF8 = linkTextUTF8.replace(re, "]");
                                    re = /%7e/gi; linkTextUTF8 = linkTextUTF8.replace(re, "~");
                                    re = /%3b/gi; linkTextUTF8 = linkTextUTF8.replace(re, ";");
                                    var encodedLinkTitleUTF8Wide = encodeURIComponent(linkTitleUTF8Wide);
                                    var encodedLinkTextUTF8Wide = encodeURIComponent(linkTextUTF8Wide);
                                    var encodedLinkTitleUTF8 = encodeURIComponent(linkTitleUTF8);
                                    var encodedLinkTextUTF8 = encodeURIComponent(linkTextUTF8);
                                    var encodedLinkTitle = encodeURIComponent(linkTitle);
                                    var encodedLinkText = encodeURIComponent(linkText);
                                    var encodedThumbnailPicURL = encodeURIComponent(thumbnailPicURL);
                                    var encodedActualPageUrl = encodeURIComponent(actualPageUrl);
                                    var encodedStringAjax = '%5B%22' + encodedString + '%22%2C%22oz%3A' + '108786367072722125468' + '.' + timeIndctr + '.' + Math.floor((Math.random() * 10)) + '%22%2Cnull%2Cnull%2Cnull%2Cnull%2C%22%5B%5C%22%5Bnull%2Cnull%2Cnull%2C%5C%5C%5C%22' + encodedLinkTitleUTF8Wide + '%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5C%5C%5C%22' + encodedLinkTextUTF8Wide + '%22%2Cnull%2Cnull%2C%5Bnull%2C%5C%5C%5C%22' + encodedActualPageUrl + '%5C%5C%5C%22%2Cnull%2C%5C%5C%5C%22text%2Fhtml%5C%5C%5C%22%2C%5C%5C%5C%22document%5C%5C%5C%22%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5Bnull%2C%5C%5C%5C%22%2F%2Fs2.googleusercontent.com%2Fs2%2Ffavicons%3Fdomain%3Dwiki.moegirl.org%5C%5C%5C%22%2Cnull%2Cnull%5D%2C%5Bnull%2C%5C%5C%5C%22%2F%2Fs2.googleusercontent.com%2Fs2%2Ffavicons%3Fdomain%3Dwiki.moegirl.org%5C%5C%5C%22%2Cnull%2Cnull%5D%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5Bnull%2C%5C%5C%5C%22%5C%5C%5C%22%2C%5C%5C%5C%22http%3A%2F%2Fgoogle.com%2Fprofiles%2Fmedia%2Fprovider%5C%5C%5C%22%2C%5C%5C%5C%22%5C%5C%5C%22%5D%5D%5D%5C%22%2C%5C%22%5Bnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5Bnull%2C%5C%5C%5C%22' + encodedThumbnailPicURL + '%5C%5C%5C%22%5D%2Cnull%2Cnull%2Cnull%2C%5B%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5Bnull%2C%5C%5C%5C%22' + encodedActualPageUrl + '%5C%5C%5C%22%2Cnull%2C%5C%5C%5C%22image%2Fjpeg%5C%5C%5C%22%2C%5C%5C%5C%22photo%5C%5C%5C%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C160%2C235%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5Bnull%2C%5C%5C%5C%22' + encodedThumbnailPicURL + '%5C%5C%5C%22%2Cnull%2Cnull%5D%2C%5Bnull%2C%5C%5C%5C%22' + encodedThumbnailPicURL + '%5C%5C%5C%22%2Cnull%2Cnull%5D%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5Bnull%2C%5C%5C%5C%22images%5C%5C%5C%22%2C%5C%5C%5C%22http%3A%2F%2Fgoogle.com%2Fprofiles%2Fmedia%2Fprovider%5C%5C%5C%22%2C%5C%5C%5C%22%5C%5C%5C%22%5D%5D%5D%5C%22%5D%22%2Cnull%2Cnull%2Ctrue%2C%5B%5D%2Cfalse%2Cfalse%2Cnull%2C%5B%5D%2Cnull%2Cfalse%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cfalse%2Cfalse%2Cfalse%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5B0%5D%2C%22' + encodedActualPageUrl + '%22%2C%7B%2226807950%22%3A%5B%22' + encodedActualPageUrl + '%22%2C%22' + encodedThumbnailPicURL + '%22%2C%22' + encodedLinkTitleUTF8 + '%22%2C%22' + encodedLinkTextUTF8 + '%22%2C%5B%22%2F%2Fimages2-focus-opensocial.googleusercontent.com%2Fgadgets%2Fproxy%3Furl%3D' + encodedThumbnailPicURL + '%26container%3Dfocus%26gadget%3Da%26rewriteMime%3Dimage%2F*%26refresh%3D31536000%26resize_h%3D150%26resize_w%3D150%26no_expand%3D1%22%2C150%2C150%5D%2C%22%2F%2Fs2.googleusercontent.com%2Fs2%2Ffavicons%3Fdomain%3Dwiki.moegirl.org%22%2C%5B%5D%5D%7D%5D%2Cnull%2C%5B%5D%2C%5B%5B%5Bnull%2Cnull%2C1%5D%5D%5D%5D';
                                    var ajaxPOST = new XMLHttpRequest();
                                    ajaxPOST.onreadystatechange = function () {
                                        if (ajaxPOST.readyState == 4 && ajaxPOST.status == 400) {
                                            var arr = eval('//' + ajaxPOST.responseText);
                                            localStorage["identifier"] = arr[0][0][4][1];
                                        }
                                    }
                                    ajaxPOST.open('POST', 'https://plus.google.com/b/108786367072722125468/_/sharebox/post/?spam=20&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true); var params = "f.req=" + encodedStringAjax + "&at=" + identifier;
                                    ajaxPOST.setRequestHeader("Connection", "keep-alive");
                                    ajaxPOST.setRequestHeader("Content-length", params.length);
                                    ajaxPOST.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                                    ajaxPOST.setRequestHeader("Host", "plus.google.com");
                                    ajaxPOST.setRequestHeader("Origin", "https://plus.google.com");
                                    ajaxPOST.send(params);
                                    localStorage["processedPostTitle"] = pageTitle;
                                }
                            }
                        }
                        ajaxPOSTLink.open('POST', 'https://plus.google.com/b/108786367072722125468/_/sharebox/linkpreview/?c=' + encodeURIComponent(actualPageUrl) + '&t=1&slpf=0&ml=1&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true); var params = "susp=false&at=" + identifier;
                        ajaxPOSTLink.setRequestHeader("Connection", "keep-alive");
                        ajaxPOSTLink.setRequestHeader("Content-length", params.length);
                        ajaxPOSTLink.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                        ajaxPOSTLink.setRequestHeader("Host", "plus.google.com");
                        ajaxPOSTLink.setRequestHeader("Origin", "https://plus.google.com");
                        ajaxPOSTLink.send(params);
                    }
                }
                ajaxPage.open('GET', 'http://wiki.moegirl.org/api.php?action=query&prop=revisions&rvprop=content&format=xml&pageids=' + latestPageId, true);
                ajaxPage.send();
            }
        }
        ajax.open('GET', 'http://wiki.moegirl.org/api.php?format=xml&action=query&list=recentchanges&rcprop=title%7Cids%7Csizes%7Cflags%7Cuser&rclimit=10', true);
        ajax.send();
    }, 60000);