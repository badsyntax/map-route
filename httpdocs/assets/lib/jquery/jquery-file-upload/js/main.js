/*
 * jQuery File Upload Plugin JS Example 7.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */

$(function () {

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        autoUpload: true,
        type: 'POST',     
        dataType: 'xml', // This is really important as s3 gives us back the url of the file in a XML document
        url: 'https://maproute-local-photos.s3.amazonaws.com/',
        formData: {                                                  
          key: "uploads/${filename}",                                        
          AWSAccessKeyId: "AKIAIVYJAENDGX5BFRYQ",                   
          acl: "public-read",                                        
          policy: "eyJleHBpcmF0aW9uIjoiMjAxMy0wMy0wNFQyMjoxODo1MVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJtYXByb3V0ZS1sb2NhbC1waG90b3MifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsInVwbG9hZHMvIl0seyJhY2wiOiJwdWJsaWMtcmVhZCJ9LHsic3VjY2Vzc19hY3Rpb25fcmVkaXJlY3QiOiJodHRwOi8vc3RhZ2luZy5tYXByb3V0ZS5jYy9ob21lL3MzY2FsbGJhY2sifSxbInN0YXJ0cy13aXRoIiwiJENvbnRlbnQtVHlwZSIsIiJdLFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3Nl1dfQ==",                                  
          signature: "8JLDlCsKjQH5fEyzt/A5DdI6swM=",                            
          success_action_redirect: "http://staging.maproute.cc/home/s3callback",
        'Content-Type': "image/jpeg"
        }              
    });


});
