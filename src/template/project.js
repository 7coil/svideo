export default {
  "targets": [
    {
      "isStage": true,
      "name": "Stage",
      "variables": {
        "`jEk@4|i[#Fk?(8x)AV.-my variable": ["int frame", "0"],
        "S8Ha(DtgOz.L:/+YvVY?": ["int minutesCounter", 0],
        "=l:UD!4.}gX|m$tsMT,]": ["int secondsCounter", 0],
        "B|A_1NenTUID8~#PxNtK": ["int framerate", [false,1,3]],
        "Mbh:%Zf`:qYUO8ZC=0mu": ["int frameEnd", [false,1,4]],
        "2-(+$f#!~EN#gF7?/)+s": ["int row", "0"],
        "(3.j8FxP@F|p_EE-ClBL": ["int column", "0"],
        "ww^dI5V{_)+M@$41W=d{": ["int scratchWidth", "480"],
        "1Ag,b;bs`Yb#_,m,edyj": ["float displacement", [false,1,9]],
        "h8Jl/CEDZ6[y-v^Te{.=": ["int framesPerColumn", [false,1,6]],
        "=zdj-#@ap)xXk3Gt%1iC": ["int width", [false,1,8]],
        "xpdvh@ZoTjjbWtN0${@R": ["int soundInterval", [false,1,7]],
        "T3wDP7pJgU~GO?;[II.o": ["int y", [false,1,10]]
      },
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "comments": {},
      "currentCostume": 0,
      "costumes": [
        {
          "assetId": "8f403c1439e63a0e3049e8ac4442b451",
          "name": "letterbox",
          "bitmapResolution": 1,
          "md5ext": "8f403c1439e63a0e3049e8ac4442b451.svg",
          "dataFormat": "svg",
          "rotationCenterX": 357.37618,
          "rotationCenterY": 271.49999999999994
        }
      ],
      "sounds": [],
      "volume": 100,
      "layerOrder": 0,
      "tempo": 60,
      "videoTransparency": 50,
      "videoState": "on",
      "textToSpeechLanguage": null
    },
    {
      "isStage": false,
      "name": "Video Player",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {
        "t5eO,h@eI5jQ*[w?e/-=": {
          "opcode": "procedures_definition",
          "next": "{6)%O;XztUf9c8Sy)nSY",
          "parent": null,
          "inputs": { "custom_block": [1, "LIqeuPA9s@m}MA_)V1DF"] },
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": -326,
          "y": -231
        },
        "LIqeuPA9s@m}MA_)V1DF": {
          "opcode": "procedures_prototype",
          "next": null,
          "parent": "t5eO,h@eI5jQ*[w?e/-=",
          "inputs": {},
          "fields": {},
          "shadow": true,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "Stage.play = () : void => {}",
            "argumentids": "[]",
            "argumentnames": "[]",
            "argumentdefaults": "[]",
            "warp": "false"
          }
        },
        "{6)%O;XztUf9c8Sy)nSY": {
          "opcode": "procedures_call",
          "next": "kor872Fogsh$Q~r~$z-q",
          "parent": "t5eO,h@eI5jQ*[w?e/-=",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "reset",
            "argumentids": "[]",
            "warp": "true"
          }
        },
        "kor872Fogsh$Q~r~$z-q": {
          "opcode": "sound_play",
          "next": "eVlCMckyX:,*ftFEI#*m",
          "parent": "{6)%O;XztUf9c8Sy)nSY",
          "inputs": { "SOUND_MENU": [1, "NdG.bQ/WY7C8lLmysJKK"] },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "NdG.bQ/WY7C8lLmysJKK": {
          "opcode": "sound_sounds_menu",
          "next": null,
          "parent": "kor872Fogsh$Q~r~$z-q",
          "inputs": {},
          "fields": { "SOUND_MENU": ["0.mp3", null] },
          "shadow": true,
          "topLevel": false
        },
        "eVlCMckyX:,*ftFEI#*m": {
          "opcode": "control_forever",
          "next": null,
          "parent": "kor872Fogsh$Q~r~$z-q",
          "inputs": { "SUBSTACK": [2, "BEZokh!pvRn,XFUd+~qZ"] },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "BEZokh!pvRn,XFUd+~qZ": {
          "opcode": "data_setvariableto",
          "next": "_]GQ(g|6_%yUM*+xTS]p",
          "parent": "eVlCMckyX:,*ftFEI#*m",
          "inputs": { "VALUE": [3, "]6rY#R;mGf,`iQ?kCzvI", [10, "0"]] },
          "fields": {
            "VARIABLE": ["int frame", "`jEk@4|i[#Fk?(8x)AV.-my variable"]
          },
          "shadow": false,
          "topLevel": false
        },
        "]6rY#R;mGf,`iQ?kCzvI": {
          "opcode": "operator_mathop",
          "next": null,
          "parent": "BEZokh!pvRn,XFUd+~qZ",
          "inputs": { "NUM": [3, "Shh-OOA:k2KEmt*ep2`r", [4, ""]] },
          "fields": { "OPERATOR": ["floor", null] },
          "shadow": false,
          "topLevel": false
        },
        "_]GQ(g|6_%yUM*+xTS]p": {
          "opcode": "data_setvariableto",
          "next": ".[#Ai?c0/bHH,eJhO/xy",
          "parent": "BEZokh!pvRn,XFUd+~qZ",
          "inputs": { "VALUE": [3, "N^]EX|3G~y+bAcc.u_eA", [10, "0"]] },
          "fields": {
            "VARIABLE": ["int secondsCounter", "=l:UD!4.}gX|m$tsMT,]"]
          },
          "shadow": false,
          "topLevel": false
        },
        "N^]EX|3G~y+bAcc.u_eA": {
          "opcode": "operator_mathop",
          "next": null,
          "parent": "_]GQ(g|6_%yUM*+xTS]p",
          "inputs": { "NUM": [3, "F^:..!%T/Z*.63~`[jc}", [4, ""]] },
          "fields": { "OPERATOR": ["floor", null] },
          "shadow": false,
          "topLevel": false
        },
        "F^:..!%T/Z*.63~`[jc}": {
          "opcode": "operator_mod",
          "next": null,
          "parent": "N^]EX|3G~y+bAcc.u_eA",
          "inputs": {
            "NUM1": [3, "Ur!}DWi84qM*]EA|3tN;", [4, ""]],
            "NUM2": [1, [4, "60"]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "Ur!}DWi84qM*]EA|3tN;": {
          "opcode": "sensing_timer",
          "next": null,
          "parent": "F^:..!%T/Z*.63~`[jc}",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ".[#Ai?c0/bHH,eJhO/xy": {
          "opcode": "data_setvariableto",
          "next": "uxn0YnQ-DTj|o0{/H?0W",
          "parent": "_]GQ(g|6_%yUM*+xTS]p",
          "inputs": { "VALUE": [3, "}E_}A/|GCWrL/yDJi#v{", [10, "0"]] },
          "fields": {
            "VARIABLE": ["int minutesCounter", "S8Ha(DtgOz.L:/+YvVY?"]
          },
          "shadow": false,
          "topLevel": false
        },
        "}E_}A/|GCWrL/yDJi#v{": {
          "opcode": "operator_mathop",
          "next": null,
          "parent": ".[#Ai?c0/bHH,eJhO/xy",
          "inputs": { "NUM": [3, "pM%-8dK!gx_usyoNaK(0", [4, ""]] },
          "fields": { "OPERATOR": ["floor", null] },
          "shadow": false,
          "topLevel": false
        },
        "pM%-8dK!gx_usyoNaK(0": {
          "opcode": "operator_divide",
          "next": null,
          "parent": "}E_}A/|GCWrL/yDJi#v{",
          "inputs": {
            "NUM1": [3, "#Io1r+#TxN[.#z0e5h0z", [4, ""]],
            "NUM2": [1, [4, "60"]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "#Io1r+#TxN[.#z0e5h0z": {
          "opcode": "sensing_timer",
          "next": null,
          "parent": "pM%-8dK!gx_usyoNaK(0",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "C_Bo0HA~%z%+-U0d^3mK": {
          "opcode": "control_if",
          "next": null,
          "parent": "Lhr4g4qc3Hs4BT-6{K%=",
          "inputs": {
            "CONDITION": [2, "v|Fxz46|`8_k_1?x9{MN"],
            "SUBSTACK": [2, "~}vG;01~cuw%#X|Qa2ac"]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "~}vG;01~cuw%#X|Qa2ac": {
          "opcode": "procedures_call",
          "next": "z;VMQ2[h]Q7QG+=AA^D1",
          "parent": "C_Bo0HA~%z%+-U0d^3mK",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "reset",
            "argumentids": "[]",
            "warp": "true"
          }
        },
        "z;VMQ2[h]Q7QG+=AA^D1": {
          "opcode": "control_stop",
          "next": null,
          "parent": "~}vG;01~cuw%#X|Qa2ac",
          "inputs": {},
          "fields": { "STOP_OPTION": ["all", null] },
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "hasnext": "false"
          }
        },
        "{Vo4bw$uB1M=PS4_M#TY": {
          "opcode": "data_setvariableto",
          "next": "%XxnK~J4N}]!%QHB=.G+",
          "parent": "uxn0YnQ-DTj|o0{/H?0W",
          "inputs": { "VALUE": [3, ".I|9)(-w0V-vG)VS5B)a", [10, "0"]] },
          "fields": { "VARIABLE": ["int column", "(3.j8FxP@F|p_EE-ClBL"] },
          "shadow": false,
          "topLevel": false
        },
        ".I|9)(-w0V-vG)VS5B)a": {
          "opcode": "operator_mod",
          "next": null,
          "parent": "{Vo4bw$uB1M=PS4_M#TY",
          "inputs": {
            "NUM1": [
              3,
              [12, "int frame", "`jEk@4|i[#Fk?(8x)AV.-my variable"],
              [4, ""]
            ],
            "NUM2": [
              3,
              [12, "int framesPerColumn", "h8Jl/CEDZ6[y-v^Te{.="],
              [4, "30"]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "%XxnK~J4N}]!%QHB=.G+": {
          "opcode": "data_setvariableto",
          "next": "c;^bB7Iu6Ie-tBj69i?K",
          "parent": "{Vo4bw$uB1M=PS4_M#TY",
          "inputs": { "VALUE": [3, "4#I?Yax.hsPHVB~JAF/Y", [10, "0"]] },
          "fields": { "VARIABLE": ["int row", "2-(+$f#!~EN#gF7?/)+s"] },
          "shadow": false,
          "topLevel": false
        },
        "4#I?Yax.hsPHVB~JAF/Y": {
          "opcode": "operator_mathop",
          "next": null,
          "parent": "%XxnK~J4N}]!%QHB=.G+",
          "inputs": { "NUM": [3, "-ZLB|-3]H,/8w5;1`UpL", [4, ""]] },
          "fields": { "OPERATOR": ["floor", null] },
          "shadow": false,
          "topLevel": false
        },
        "-ZLB|-3]H,/8w5;1`UpL": {
          "opcode": "operator_add",
          "next": null,
          "parent": "4#I?Yax.hsPHVB~JAF/Y",
          "inputs": {
            "NUM1": [3, "ds;hd(C}@aaA{Ji]?2%+", [4, ""]],
            "NUM2": [1, [4, "1"]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "ds;hd(C}@aaA{Ji]?2%+": {
          "opcode": "operator_divide",
          "next": null,
          "parent": "-ZLB|-3]H,/8w5;1`UpL",
          "inputs": {
            "NUM1": [
              3,
              [12, "int frame", "`jEk@4|i[#Fk?(8x)AV.-my variable"],
              [4, ""]
            ],
            "NUM2": [
              3,
              [12, "int framesPerColumn", "h8Jl/CEDZ6[y-v^Te{.="],
              [4, "30"]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "c;^bB7Iu6Ie-tBj69i?K": {
          "opcode": "looks_switchcostumeto",
          "next": "Lhr4g4qc3Hs4BT-6{K%=",
          "parent": "%XxnK~J4N}]!%QHB=.G+",
          "inputs": {
            "COSTUME": [
              3,
              [12, "int row", "2-(+$f#!~EN#gF7?/)+s"],
              "u!-@y:8@,!ak:CVC%ViN"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "u!-@y:8@,!ak:CVC%ViN": {
          "opcode": "looks_costume",
          "next": null,
          "parent": "c;^bB7Iu6Ie-tBj69i?K",
          "inputs": {},
          "fields": { "COSTUME": ["001.mp3", null] },
          "shadow": true,
          "topLevel": false
        },
        "Lhr4g4qc3Hs4BT-6{K%=": {
          "opcode": "motion_setx",
          "next": "C_Bo0HA~%z%+-U0d^3mK",
          "parent": "c;^bB7Iu6Ie-tBj69i?K",
          "inputs": { "X": [3, "V?7xQz=D9OF,?`KTRrg_", [4, "14640"]] },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "V?7xQz=D9OF,?`KTRrg_": {
          "opcode": "operator_subtract",
          "next": null,
          "parent": "Lhr4g4qc3Hs4BT-6{K%=",
          "inputs": {
            "NUM1": [
              3,
              [12, "float displacement", "1Ag,b;bs`Yb#_,m,edyj"],
              [4, ""]
            ],
            "NUM2": [3, "]{IdFrpG%T6)#a1O)8Mz", [4, ""]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "]{IdFrpG%T6)#a1O)8Mz": {
          "opcode": "operator_multiply",
          "next": null,
          "parent": "V?7xQz=D9OF,?`KTRrg_",
          "inputs": {
            "NUM1": [
              3,
              [12, "int scratchWidth", "ww^dI5V{_)+M@$41W=d{"],
              [4, ""]
            ],
            "NUM2": [3, [12, "int column", "(3.j8FxP@F|p_EE-ClBL"], [4, ""]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "k7C`1`BX}CfE(jkBPVLr": {
          "opcode": "procedures_definition",
          "next": "Ob2hnmgey)aj_%oAQBVB",
          "parent": null,
          "inputs": { "custom_block": [1, "@6.yHM^%xjS`^sZFn#W+"] },
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 299,
          "y": -265
        },
        "@6.yHM^%xjS`^sZFn#W+": {
          "opcode": "procedures_prototype",
          "next": null,
          "parent": "k7C`1`BX}CfE(jkBPVLr",
          "inputs": {},
          "fields": {},
          "shadow": true,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "reset",
            "argumentids": "[]",
            "argumentnames": "[]",
            "argumentdefaults": "[]",
            "warp": "true"
          }
        },
        "Ob2hnmgey)aj_%oAQBVB": {
          "opcode": "sound_stopallsounds",
          "next": "([[,s2nA(:gq,gO:@f@E",
          "parent": "k7C`1`BX}CfE(jkBPVLr",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "([[,s2nA(:gq,gO:@f@E": {
          "opcode": "sensing_resettimer",
          "next": "6:GD-`99?hpi~xL8pFaK",
          "parent": "Ob2hnmgey)aj_%oAQBVB",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "6:GD-`99?hpi~xL8pFaK": {
          "opcode": "data_setvariableto",
          "next": "C3CZFbpSZ}z2Pr(?OEAq",
          "parent": "([[,s2nA(:gq,gO:@f@E",
          "inputs": { "VALUE": [1, [10, "0"]] },
          "fields": {
            "VARIABLE": ["int frame", "`jEk@4|i[#Fk?(8x)AV.-my variable"]
          },
          "shadow": false,
          "topLevel": false
        },
        "C3CZFbpSZ}z2Pr(?OEAq": {
          "opcode": "data_setvariableto",
          "next": "Oy`0A1AR.-JFsive?E^*",
          "parent": "6:GD-`99?hpi~xL8pFaK",
          "inputs": { "VALUE": [1, [10, "0"]] },
          "fields": { "VARIABLE": ["int row", "2-(+$f#!~EN#gF7?/)+s"] },
          "shadow": false,
          "topLevel": false
        },
        "Oy`0A1AR.-JFsive?E^*": {
          "opcode": "data_setvariableto",
          "next": "otH1xku)i#{Rd[qqlt;Z",
          "parent": "C3CZFbpSZ}z2Pr(?OEAq",
          "inputs": { "VALUE": [1, [10, "0"]] },
          "fields": { "VARIABLE": ["int column", "(3.j8FxP@F|p_EE-ClBL"] },
          "shadow": false,
          "topLevel": false
        },
        "otH1xku)i#{Rd[qqlt;Z": {
          "opcode": "data_setvariableto",
          "next": "8{gSI3ZWKv*/)]J@z~#N",
          "parent": "Oy`0A1AR.-JFsive?E^*",
          "inputs": { "VALUE": [1, [10, "480"]] },
          "fields": {
            "VARIABLE": ["int scratchWidth", "ww^dI5V{_)+M@$41W=d{"]
          },
          "shadow": false,
          "topLevel": false
        },
        "I.!bbMsz;U_+/rdmh)j3": {
          "opcode": "event_whenflagclicked",
          "next": "~vpT:#4tT_n!_)qhvAsY",
          "parent": null,
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 67,
          "y": -264
        },
        "~vpT:#4tT_n!_)qhvAsY": {
          "opcode": "procedures_call",
          "next": null,
          "parent": "I.!bbMsz;U_+/rdmh)j3",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "Stage.play = () : void => {}",
            "argumentids": "[]",
            "warp": "false"
          }
        },
        "SZpoMvl`@c,=3HGsJ9YX": {
          "opcode": "operator_mod",
          "next": null,
          "parent": "3.lBJ21HB12S$b7td#?K",
          "inputs": {
            "NUM1": [
              3,
              [12, "int frame", "`jEk@4|i[#Fk?(8x)AV.-my variable"],
              [4, "4"]
            ],
            "NUM2": [
              3,
              [12, "int soundInterval", "xpdvh@ZoTjjbWtN0${@R"],
              [4, ""]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "uxn0YnQ-DTj|o0{/H?0W": {
          "opcode": "control_if",
          "next": "{Vo4bw$uB1M=PS4_M#TY",
          "parent": ".[#Ai?c0/bHH,eJhO/xy",
          "inputs": {
            "CONDITION": [2, "%(2=cnQiU%Xv+g[;o9#Z"],
            "SUBSTACK": [2, "+USN9)iF-srrsFJ@7Swh"]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "7s)O1a(|WwIwSr?`C:?A": {
          "opcode": "operator_equals",
          "next": null,
          "parent": "%(2=cnQiU%Xv+g[;o9#Z",
          "inputs": {
            "OPERAND1": [1, [10, "0"]],
            "OPERAND2": [3, "3.lBJ21HB12S$b7td#?K", [10, "50"]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "3.lBJ21HB12S$b7td#?K": {
          "opcode": "operator_mathop",
          "next": null,
          "parent": "7s)O1a(|WwIwSr?`C:?A",
          "inputs": { "NUM": [3, "SZpoMvl`@c,=3HGsJ9YX", [4, ""]] },
          "fields": { "OPERATOR": ["floor", null] },
          "shadow": false,
          "topLevel": false
        },
        "+USN9)iF-srrsFJ@7Swh": {
          "opcode": "sound_play",
          "next": null,
          "parent": "uxn0YnQ-DTj|o0{/H?0W",
          "inputs": {
            "SOUND_MENU": [3, "~`g9]r$,Fpr|=dOfdu~:", "fana}v}8Q%2S{Pvq6`(7"]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "fana}v}8Q%2S{Pvq6`(7": {
          "opcode": "sound_sounds_menu",
          "next": null,
          "parent": null,
          "inputs": {},
          "fields": { "SOUND_MENU": ["0.mp3", null] },
          "shadow": true,
          "topLevel": true,
          "x": -176,
          "y": 775
        },
        "/nUc*S%xz45H^JlNST`n": {
          "opcode": "operator_mathop",
          "next": null,
          "parent": "~`g9]r$,Fpr|=dOfdu~:",
          "inputs": { "NUM": [3, "GybZ/T=?I;$0w6mWB$k@", [4, ""]] },
          "fields": { "OPERATOR": ["floor", null] },
          "shadow": false,
          "topLevel": false
        },
        "~`g9]r$,Fpr|=dOfdu~:": {
          "opcode": "operator_join",
          "next": null,
          "parent": "+USN9)iF-srrsFJ@7Swh",
          "inputs": {
            "STRING1": [3, "/nUc*S%xz45H^JlNST`n", [10, "apple "]],
            "STRING2": [1, [10, ".mp3"]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "GybZ/T=?I;$0w6mWB$k@": {
          "opcode": "operator_divide",
          "next": null,
          "parent": "/nUc*S%xz45H^JlNST`n",
          "inputs": {
            "NUM1": [
              3,
              [12, "int frame", "`jEk@4|i[#Fk?(8x)AV.-my variable"],
              [4, ""]
            ],
            "NUM2": [
              3,
              [12, "int soundInterval", "xpdvh@ZoTjjbWtN0${@R"],
              [4, ""]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ":3k[0,:UIU15QC?eWF`A": {
          "opcode": "operator_equals",
          "next": null,
          "parent": "T-5-CH_oR*zW`PAL!1_Y",
          "inputs": {
            "OPERAND1": [
              3,
              [12, "int soundInterval", "xpdvh@ZoTjjbWtN0${@R"],
              [10, ""]
            ],
            "OPERAND2": [1, [10, "0"]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "%(2=cnQiU%Xv+g[;o9#Z": {
          "opcode": "operator_and",
          "next": null,
          "parent": "uxn0YnQ-DTj|o0{/H?0W",
          "inputs": {
            "OPERAND2": [2, "7s)O1a(|WwIwSr?`C:?A"],
            "OPERAND1": [2, "T-5-CH_oR*zW`PAL!1_Y"]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "T-5-CH_oR*zW`PAL!1_Y": {
          "opcode": "operator_not",
          "next": null,
          "parent": "%(2=cnQiU%Xv+g[;o9#Z",
          "inputs": { "OPERAND": [2, ":3k[0,:UIU15QC?eWF`A"] },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "Shh-OOA:k2KEmt*ep2`r": {
          "opcode": "operator_multiply",
          "next": null,
          "parent": "]6rY#R;mGf,`iQ?kCzvI",
          "inputs": {
            "NUM1": [3, "/wVI_**63OZMW$,H}}}O", [4, ""]],
            "NUM2": [3, [12, "int framerate", "B|A_1NenTUID8~#PxNtK"], [4, ""]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "/wVI_**63OZMW$,H}}}O": {
          "opcode": "sensing_timer",
          "next": null,
          "parent": "Shh-OOA:k2KEmt*ep2`r",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "v|Fxz46|`8_k_1?x9{MN": {
          "opcode": "operator_gt",
          "next": null,
          "parent": "C_Bo0HA~%z%+-U0d^3mK",
          "inputs": {
            "OPERAND1": [
              3,
              [12, "int frame", "`jEk@4|i[#Fk?(8x)AV.-my variable"],
              [10, ""]
            ],
            "OPERAND2": [
              3,
              [12, "int frameEnd", "Mbh:%Zf`:qYUO8ZC=0mu"],
              [10, "50"]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "8{gSI3ZWKv*/)]J@z~#N": {
          "opcode": "motion_sety",
          "next": null,
          "parent": "otH1xku)i#{Rd[qqlt;Z",
          "inputs": {
            "Y": [3, [12, "int y", "T3wDP7pJgU~GO?;[II.o"], [4, "0"]]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        }
      },
      "comments": {
        "A@zeJC-mLrm@DRfB??B3": {
          "blockId": null,
          "x": 275.5555555555556,
          "y": -770.3703703703704,
          "width": 795.5554809570312,
          "height": 468.14813232421875,
          "minimized": false,
          "text": "MIT License\n\nCopyright (c) 2020 Leondro Lio <github@leondrolio.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n"
        },
        "[c1-V(?v]L)^6Lc1a%q.": {
          "blockId": null,
          "x": -339.25925925925924,
          "y": -890.3703703703701,
          "width": 602.9627075195312,
          "height": 586.6667175292969,
          "minimized": false,
          "text": "# scratch-player\nConvert video into MIT Scratch!\n\nhttps://github.com/7coil/scratch-player\n\n## Help\nFor support, try [my discord server](https://discordapp.com/invite/wHgdmf4).\n\n## Usage\n1. Install dependencies with `yarn`\n2. Build project with `yarn build`\n3. Run `node dist/ -i [video file] -o [output file].sb3`\n\n```\nOptions:\n      --help                  Show help                                [boolean]\n      --version               Show version number                      [boolean]\n  -n, --framesPerStrip                                    [number] [default: 30]\n  -i, --input                                                [string] [required]\n  -o, --output                                               [string] [required]\n  -h, --horizontalResolution                             [number] [default: 480]\n  -t, --temporaryFolder                              [string] [default: \"temp/\"]\n  -f, --imageFileFormat                 [choices: \"png\", \"jpg\"] [default: \"png\"]\n  -r, --frameRate                                                       [number]\n```\n\n## Licence\nThis project is licenced under the MIT licence. Because it's MIT Scratch. Haha.\n"
        }
      },
      "currentCostume": 0,
      "costumes": [false,1,1],
      "sounds": [false,1,2],
      "volume": 100,
      "layerOrder": 1,
      "visible": true,
      "x": 7680,
      "y": 0,
      "size": [false,1,5],
      "direction": 90,
      "draggable": false,
      "rotationStyle": "all around"
    }
  ],
  "monitors": [
    {
      "id": "`jEk@4|i[#Fk?(8x)AV.-my variable",
      "mode": "slider",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int frame" },
      "spriteName": null,
      "value": 3642,
      "width": 0,
      "height": 0,
      "x": 6,
      "y": 58,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 1830,
      "isDiscrete": true
    },
    {
      "id": "S8Ha(DtgOz.L:/+YvVY?",
      "mode": "large",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int minutesCounter" },
      "spriteName": null,
      "value": 0,
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 5,
      "visible": true,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "=l:UD!4.}gX|m$tsMT,]",
      "mode": "large",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int secondsCounter" },
      "spriteName": null,
      "value": 0,
      "width": 0,
      "height": 0,
      "x": 55,
      "y": 5,
      "visible": true,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "B|A_1NenTUID8~#PxNtK",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int framerate" },
      "spriteName": null,
      "value": "29.97002997002997",
      "width": 0,
      "height": 0,
      "x": 333,
      "y": 3,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "timer",
      "mode": "default",
      "opcode": "sensing_timer",
      "params": {},
      "spriteName": null,
      "value": 16.603,
      "width": 0,
      "height": 0,
      "x": 16,
      "y": 22,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "Mbh:%Zf`:qYUO8ZC=0mu",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int frameEnd" },
      "spriteName": null,
      "value": "1830",
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 135,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "2-(+$f#!~EN#gF7?/)+s",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int row" },
      "spriteName": null,
      "value": 8,
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 162,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "(3.j8FxP@F|p_EE-ClBL",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int column" },
      "spriteName": null,
      "value": 12,
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 189,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "ww^dI5V{_)+M@$41W=d{",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int scratchWidth" },
      "spriteName": null,
      "value": "480",
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 216,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "1Ag,b;bs`Yb#_,m,edyj",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "float displacement" },
      "spriteName": null,
      "value": 15600,
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 270,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "h8Jl/CEDZ6[y-v^Te{.=",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int framesPerColumn" },
      "spriteName": null,
      "value": "30",
      "width": 0,
      "height": 0,
      "x": 155,
      "y": 109,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "=zdj-#@ap)xXk3Gt%1iC",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int width" },
      "spriteName": null,
      "value": 480,
      "width": 0,
      "height": 0,
      "x": 155,
      "y": 136,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "xpdvh@ZoTjjbWtN0${@R",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int soundInterval" },
      "spriteName": null,
      "value": "0x2f",
      "width": 0,
      "height": 0,
      "x": 155,
      "y": 164,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "I;sp_OAT(3XK5r}OQ#3}_volume",
      "mode": "default",
      "opcode": "sound_volume",
      "params": {},
      "spriteName": "Video Player",
      "value": 100,
      "width": 0,
      "height": 0,
      "x": 205,
      "y": 31,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "sensing_username",
      "mode": "default",
      "opcode": "sensing_username",
      "params": {},
      "spriteName": null,
      "value": "7coil",
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 34,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "current_year",
      "mode": "default",
      "opcode": "sensing_current",
      "params": { "CURRENTMENU": "YEAR" },
      "spriteName": null,
      "value": 2020,
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 34,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "loudness",
      "mode": "default",
      "opcode": "sensing_loudness",
      "params": {},
      "spriteName": null,
      "value": 2,
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 34,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    },
    {
      "id": "T3wDP7pJgU~GO?;[II.o",
      "mode": "default",
      "opcode": "data_variable",
      "params": { "VARIABLE": "int y" },
      "spriteName": null,
      "value": 0,
      "width": 0,
      "height": 0,
      "x": 5,
      "y": 34,
      "visible": false,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    }
  ],
  "extensions": [],
  "meta": {
    "semver": "3.0.0",
    "vm": "0.2.0-prerelease.20201112030151",
    "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Whale/2.8.108.15 Safari/537.36"
  }
}