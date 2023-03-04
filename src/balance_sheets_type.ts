import { Source } from "./type";

export type BS_ACC_FIELDS = "ACCHELDFORS" | "ACCREXPE"
  | "ACCUDEPR"
  | "ACTITRADSECU"
  | "ACTIUNDESECU"
  | "ADVAPAYM"
  | "AMORTIZCOSTASSETS"
  | "AVAISELLASSE"
  | "BDSPAYA"
  | "CAPISURP"
  | "CENBANKBORR"
  | "COMASSE"
  | "CONSPROG"
  | "CONSPROGTOT"
  | "CONTRACTASSET"
  | "CONTRACTLIAB"
  | "COPEPOUN"
  | "COPEWITHREINRECE"
  | "COPEWORKERSAL"
  | "CURFDS"
  | "CURTRANDIFF"
  | "DEFEINCOTAXLIAB"
  | "DEFEREVE"
  | "DEFETAXASSET"
  | "DEPOSIT"
  | "DERIFINAASSET"
  | "DERILIAB"
  | "DEVEEXPE"
  | "DIVIDRECE"
  | "DIVIPAYA"
  | "DOMETICKSETT"
  | "DUENONCLIAB"
  | "ENGIMATE"
  | "EQUIINVE"
  | "EXPECURRLIAB"
  | "EXPENONCLIAB"
  | "EXPINONCURRASSET"
  | "EXPOTAXREBARECE"
  | "FAIRVALUEASSETS"
  | "FDSBORR"
  | "FIXEDASSECLEATOT"
  | "FIXEDASSEIMMO"
  | "FIXEDASSEIMPA"
  | "FIXEDASSENETW"
  | "GENERISKRESE"
  | "GOODWILL"
  | "HOLDINVEDUE"
  | "HYDRASSET"
  | "INSUCONTRESE"
  | "INTAASSET"
  | "INTELPAY"
  | "INTELRECE"
  | "INTEPAYA"
  | "INTERECE"
  | "INTETICKSETT"
  | "INVE"
  | "INVEPROP"
  | "LCOPEWORKERSAL"
  | "LEASELIAB"
  | "LENDANDLOAN"
  | "LIABHELDFORS"
  | "LOGPREPEXPE"
  | "LONGBORR"
  | "LONGDEFEINCO"
  | "LONGPAYA"
  | "LONGPAYATOT"
  | "LONGRECE"
  | "MARGRECE"
  | "MARGREQU"
  | "MINYSHARRIGH"
  | "NOTESACCOPAYA"
  | "NOTESACCORECE"
  | "OCL"
  | "OTHDEBTINVEST"
  | "OTHEQUIN"
  | "OTHEQUININVEST"
  | "OTHERCURRASSE"
  | "OTHERCURRELIABI"
  | "OTHERFEEPAYA"
  | "OTHERLONGINVE"
  | "OTHERNONCASSE"
  | "OTHERNONCFINASSE"
  | "OTHERNONCLIABI"
  | "OTHERPAY"
  | "OTHERPAYTOT"
  | "OTHERRECE"
  | "OTHERRECETOT"
  | "PAIDINCAPI"
  | "PLAC"
  | "PREMRECE"
  | "PREP"
  | "PREPEXPE"
  | "PRODASSE"
  | "PURCRESAASSET"
  | "RECFINANC"
  | "REINCONTRESE"
  | "REINRECE"
  | "RESE"
  | "RUSEASSETS"
  | "SELLREPASSE"
  | "SETTRESEDEPO"
  | "SHORTTERMBDSPAYA"
  | "SHORTTERMBORR"
  | "SPECPAYA"
  | "SPECRESE"
  | "SUBSRECE"
  | "TAXESPAYA"
  | "TOPAYCASHDIVI"
  | "TRADFINASSET"
  | "TRADFINLIAB"
  | "TRADSHARTRAD"
  | "TREASTK"
  | "UNDIPROF"
  | "UNREINVELOSS"
  | "UNSEG"
  | "WARLIABRESE";


export type BS_TOTAL_FIELDS = "PARESHARRIGH" | "RIGHAGGR" | "TOTALCURRLIAB" | "TOTALNONCASSETS" | "TOTALNONCLIAB" | "TOTASSET" | "TOTCURRASSET" | "TOTLIAB" | "TOTLIABSHAREQUI"


export interface BalanceSheet {
  rType: string;
  rCurrency: string;
  data_source: string;
  is_audit: string;
  publish_date: string;
  update_time: number;
  is_exist_yoy: boolean;
  data: Datum[];
}

export interface Datum {
  item_field: BS_ACC_FIELDS | BS_TOTAL_FIELDS;
  /**
   * 会计科目
   */
  item_title: string;
  /**
   * if available, the decimal value
   */
  item_value: null | string;
  /**
   * 1 大类
   * 2 小类
   * 3 小类但无值 - 缩进
   * 6 中类
   */
  item_display_type: 1 | 2 | 3 | 6;
  item_display: '中类' | '大类' | '小类' | '缩进';
  item_precision: ItemPrecision;
  item_group_no: number;
  item_source: Source;
  item_tongbi: number | string;
}


export enum ItemPrecision {
  F2 = "f2",
}


