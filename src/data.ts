import type { TreeOption } from 'naive-ui'
import { computed, reactive } from 'vue'
import type { Task } from './types'

export interface TaskData {
  [task: string]: Task
}

function getNext(prf: string, opt: TreeOption[], key: string): TreeOption[] {
  for (const o of opt) {
    if (o.key === `${prf}${key}.`) {
      if (!o.children) {
        o.children = []
      }
      return o.children
    }
  }
  const o: TreeOption = {
    key: `${prf}${key}.`,
    label: key,
    children: []
  }
  opt.push(o)
  return o.children!
}

export const taskData = reactive<{ data: TaskData }>({ data: {} })
export const taskTree = computed<TreeOption[]>(() => {
  const result: TreeOption[] = []

  for (const key in taskData.data) {
    const task = taskData.data[key]
    const path = (task.editor_info?.path ?? 'default').split('.')
    let opt = result
    let prf = ''
    for (const p of path) {
      opt = getNext(prf, opt, p)
      prf += `${p}.`
    }
    opt.push({
      key: `${path}.${key}`,
      label: key
    })
  }

  const doSort = (arr: TreeOption[]) => {
    arr.sort((a, b) => {
      return a.label!.localeCompare(b.label!)
    })
    for (const a of arr) {
      if (a.children) {
        doSort(a.children)
      }
    }
  }

  doSort(result)

  return result
})

taskData.data = JSON.parse(`{
  "Combat": {
      "next": [
          "EnterTheShow",
          "Sub_StartUp"
      ]
  },
  "EnterTheShow": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/EnterTheShow.png",
      "roi": [
          926,
          221,
          229,
          153
      ],
      "action": "Click",
      "next_doc": "Set in code."
  },
  "MainChapter_1": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/MainChapter_1.png",
      "roi": [
          60,
          98,
          318,
          455
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "MainChapter_2": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/MainChapter_2.png",
      "roi": [
          340,
          99,
          310,
          452
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "MainChapter_3": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/MainChapter_3.png",
      "roi": [
          618,
          98,
          313,
          455
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "MainChapter_4": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/MainChapter_4.png",
      "roi": [
          897,
          108,
          316,
          444
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "Sub_ResourceChapterLabel": {
      "is_sub": true,
      "recognition": "TemplateMatch",
      "template": "template/Combat/ResourceChapterLabel.png",
      "threshold": 0.98,
      "roi": [
          230,
          577,
          145,
          142
      ],
      "action": "Click"
  },
  "ResourceChapter_LP": {
      "doc": "尘埃运动",
      "next": [
          "ResourceChapter_LPEnter",
          "Sub_ResourceChapterLabel"
      ]
  },
  "ResourceChapter_LPEnter": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/ResourceChapter_LPEnter.png",
      "threshold": 0.9,
      "roi": [
          0,
          153,
          1280,
          367
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "ResourceChapter_MA": {
      "doc": "猪鼻美学",
      "next": [
          "ResourceChapter_MAEnter",
          "Sub_ResourceChapterLabel",
          "Sub_SwipeRightForChapter"
      ]
  },
  "ResourceChapter_MAEnter": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/ResourceChapter_MAEnter.png",
      "threshold": 0.9,
      "roi": [
          0,
          153,
          1280,
          367
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "ResourceChapter_HP": {
      "doc": "丰收时令",
      "next": [
          "ResourceChapter_HPEnter",
          "Sub_ResourceChapterLabel",
          "Sub_SwipeRightForChapter"
      ]
  },
  "ResourceChapter_HPEnter": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/ResourceChapter_HPEnter.png",
      "threshold": 0.9,
      "roi": [
          0,
          153,
          1280,
          367
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "Sub_PromotionChapterLabel": {
      "is_sub": true,
      "recognition": "TemplateMatch",
      "template": "template/Combat/PromotionChapterLabel.png",
      "threshold": 0.98,
      "roi": [
          388,
          578,
          157,
          133
      ],
      "action": "Click"
  },
  "PromotionChapter_ME": {
      "doc": "群山之声",
      "next": [
          "PromotionChapter_MEEnter",
          "Sub_PromotionChapterLabel"
      ]
  },
  "PromotionChapter_MEEnter": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/PromotionChapter_MEEnter.png",
      "threshold": 0.9,
      "roi": [
          0,
          153,
          1280,
          367
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "PromotionChapter_SL": {
      "doc": "星陨之所",
      "next": [
          "PromotionChapter_SLEnter",
          "Sub_PromotionChapterLabel"
      ]
  },
  "PromotionChapter_SLEnter": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/PromotionChapter_SLEnter.png",
      "threshold": 0.9,
      "roi": [
          0,
          153,
          1280,
          367
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "PromotionChapter_SS": {
      "doc": "深林之形",
      "next": [
          "PromotionChapter_SSEnter",
          "Sub_PromotionChapterLabel",
          "Sub_SwipeRightForChapter"
      ]
  },
  "PromotionChapter_SSEnter": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/PromotionChapter_SSEnter.png",
      "threshold": 0.9,
      "roi": [
          0,
          153,
          1280,
          367
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "PromotionChapter_BW": {
      "doc": "荒兽之野",
      "next": [
          "PromotionChapter_BWEnter",
          "Sub_PromotionChapterLabel",
          "Sub_SwipeRightForChapter"
      ]
  },
  "PromotionChapter_BWEnter": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/PromotionChapter_BWEnter.png",
      "threshold": 0.9,
      "roi": [
          0,
          153,
          1280,
          367
      ],
      "action": "Click",
      "next": "SwipeLeftAndFindStage"
  },
  "Sub_SwipeRightForChapter": {
      "is_sub": true,
      "action": "Swipe",
      "begin": [
          1100,
          300,
          100,
          100
      ],
      "end": [
          100,
          300,
          100,
          100
      ]
  },
  "SwipeLeftAndFindStage": {
      "next": [
          "TargetStageName",
          "TheFarLeftOfStageList",
          "SwipeLeftForStageList"
      ]
  },
  "TargetStageName": {
      "recognition": "OCR",
      "text_doc": "Set in code.",
      "roi": [
          0,
          470,
          1280,
          160
      ],
      "action": "Click",
      "next": [
          "StageDifficulty"
      ]
  },
  "TheFarLeftOfStageList": {
      "recognition": "OCR",
      "text": "01",
      "roi": [
          0,
          470,
          1280,
          160
      ],
      "next": [
          "Combat"
      ]
  },
  "SwipeLeftForStageList": {
      "action": "Swipe",
      "begin": [
          100,
          550,
          100,
          50
      ],
      "end": [
          1100,
          550,
          100,
          50
      ],
      "next": [
          "SwipeLeftAndFindStage"
      ]
  },
  "StageDifficulty": {
      "next_doc": "Set in code."
  },
  "StageDifficulty_Story": {
      "recognition": "OCR",
      "text": [
          "故事"
      ],
      "roi": [
          837,
          167,
          443,
          194
      ],
      "action": "Click",
      "next": [
          "ReadyForAction"
      ]
  },
  "StageDifficulty_Hard": {
      "recognition": "OCR",
      "text": [
          "厄险"
      ],
      "roi": [
          837,
          167,
          443,
          194
      ],
      "action": "Click",
      "next": [
          "ReadyForAction"
      ]
  },
  "StageDifficulty_None": {
      "next": [
          "ReadyForAction"
      ]
  },
  "ReadyForAction": {
      "recognition": "OCR",
      "text": [
          "开始行动"
      ],
      "roi": [
          900,
          500,
          380,
          220
      ],
      "action": "Click",
      "next": [
          "SwitchToReplay",
          "OpenReplaysTimes"
      ]
  },
  "SwitchToReplay": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/SwitchToReplay.png",
      "roi": [
          781,
          581,
          145,
          139
      ],
      "action": "Click",
      "next": [
          "OpenReplaysTimes"
      ]
  },
  "OpenReplaysTimes": {
      "recognition": "TemplateMatch",
      "template": "template/Combat/OpenReplaysTimes.png",
      "roi": [
          737,
          586,
          174,
          134
      ],
      "action": "Click",
      "next": [
          "SetReplaysTimes",
          "StartReplay"
      ]
  },
  "SetReplaysTimes": {
      "recognition": "OCR",
      "text_doc": "Set in code.",
      "roi": [
          791,
          391,
          73,
          238
      ],
      "action": "Click",
      "next": [
          "StartReplay"
      ]
  },
  "StartReplay": {
      "recognition": "OCR",
      "text": [
          "复现"
      ],
      "roi": [
          958,
          537,
          235,
          136
      ],
      "action": "Click",
      "next": [
          "Replaying",
          "StartReplay",
          "RecoveryPage"
      ]
  },
  "RecoveryPage": {
      "recognition": "OCR",
      "text": [
          "活性",
          "恢复"
      ],
      "roi": [
          465,
          571,
          277,
          149
      ],
      "action": "Click",
      "target": "StartReplay",
      "next": [
          "HomeFlag",
          "Sub_StartUp"
      ]
  },
  "Replaying": {
      "recognition": "OCR",
      "text": [
          "行为",
          "复现"
      ],
      "roi": [
          1078,
          77,
          202,
          143
      ],
      "post_delay": 5000,
      "next": [
          "Replaying",
          "Victory"
      ]
  },
  "Victory": {
      "recognition": "OCR",
      "text": [
          "战斗",
          "胜利"
      ],
      "roi": [
          678,
          10,
          473,
          240
      ],
      "action": "Click",
      "next": [
          "Victory",
          "HomeFlag",
          "Sub_StartUp"
      ]
  }
}`)
