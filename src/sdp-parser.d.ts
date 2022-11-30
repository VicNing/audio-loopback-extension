export declare interface ACKFeedback {
    type: "ack";
    parameter?: "rpsi" | "app" | string;
    additional?: string;
}

export declare interface Attribute {
    ignored?: boolean;
    attField: string;
    attValue?: string;
    _cur: number;
}

export declare interface Bandwidth {
    bwtype: string;
    bandwidth: string;
}

export declare interface Candidate {
    foundation: string;
    componentId: string;
    transport: string;
    priority: string;
    connectionAddress: string;
    port: string;
    type: string;
    relAddr?: string;
    relPort?: string;
    extension: {
        [key: string]: string;
    };
}

export declare interface Connection {
    nettype: string;
    addrtype: string;
    address: string;
}

export declare type Direction = "sendrecv" | "sendonly" | "recvonly" | "inactive";

export declare interface Extmap {
    entry: number;
    extensionName: string;
    direction?: string;
    extensionAttributes?: string;
}

export declare type ExtmapEntry = Record<string, Extmap>;

export declare interface FingerPrint {
    hashFunction: string;
    fingerprint: string;
}

export declare interface Fmtp {
    parameters: Record<string, string | null>;
}

export declare interface Group {
    semantic: string;
    identificationTag: string[];
}

export declare interface Identity {
    assertionValue: string;
    extensions: {
        name: string;
        value?: string;
    }[];
}

export declare type Key = "prompt" | "clear:" | "base64:" | "uri:";

export declare interface Media {
    mediaType: string;
    port: string;
    protos: string[];
    fmts: string[];
}

export declare interface MediaAttributes {
    mid?: string;
    iceUfrag?: string;
    icePwd?: string;
    iceOptions?: string[];
    candidates: Candidate[];
    remoteCandidatesList: RemoteCandidates[];
    endOfCandidates?: boolean;
    fingerprints: FingerPrint[];
    ptime?: string;
    maxPtime?: string;
    direction?: Direction;
    ssrcs: SSRC[];
    extmaps: Extmap[];
    rtcpMux?: boolean;
    rtcpMuxOnly?: boolean;
    rtcpRsize?: boolean;
    rtcp?: RTCP;
    msids: MSID[];
    imageattr: string[];
    rids: RID[];
    simulcast?: string;
    sctpPort?: string;
    maxMessageSize?: string;
    unrecognized: Attribute[];
    setup?: Setup;
    payloads: PayloadAttribute[];
    rtcpFeedbackWildcards: RTCPFeedback[];
    ssrcGroups: SSRCGroup[];
}

export declare interface MediaDescription {
    media: Media;
    information?: string;
    connections: Connection[];
    bandwidths: Bandwidth[];
    key?: Key;
    attributes: MediaAttributes;
}

export declare interface MSID {
    id: string;
    appdata?: string;
}

export declare interface MsidSemantic {
    semantic: string;
    applyForAll?: boolean;
    identifierList: string[];
}

export declare interface NACKFeedback {
    type: "nack";
    parameter?: "pli" | "sli" | "rpsi" | "app" | string;
    additional?: string;
}

export declare interface Origin {
    username: string;
    sessId: string;
    sessVersion: string;
    nettype: string;
    addrtype: string;
    unicastAddress: string;
}

export declare interface OtherFeedback {
    type: string;
    parameter?: "app" | string;
    additional?: string;
}

/**
 * @public
 * */
export declare function parse(sdp: string): SessionDescription;

/**
 * @public
 * */
export declare class Parser extends ParsingBase {
    private records;
    private currentLine;
    constructor();
    parse(sdp: string): SessionDescription;
    private getCurrentRecord;
    private probeEOL;
    private parseLine;
    private parseSessionAttribute;
    private parseMediaAttributes;
    private parseKey;
    private parseZone;
    private parseRepeat;
    private parseTypedTime;
    private parseTime;
    private parseBandWidth;
    private parseVersion;
    private parseOrigin;
    private parseSessionName;
    private parseInformation;
    private parseUri;
    private parseEmail;
    private parsePhone;
    private parseConnection;
    private parseMedia;
    private parseTimeFields;
    private parseMediaDescription;
    private parseConnections;
    private parseFmt;
    private extract;
    private extractOneOrMore;
    private consumeSpaceForRecord;
}

declare class ParsingBase {
    protected consumeText(str: string, cur: number): number;
    protected consumeUnicastAddress(str: string, cur: number, type?: string): number;
    protected consumeOneOrMore(str: string, cur: number, predict: (char: string) => boolean): number;
    protected consumeSpace(str: string, cur: number): number;
    protected consumeIP4Address(str: string, cur: number): number;
    protected consumeDecimalUChar(str: string, cur: number): number;
    protected consumeIP6Address(str: string, cur: number): number;
    protected consumeHexpart(str: string, cur: number): number;
    protected consumeHexseq(str: string, cur: number): number;
    protected consumeHex4(str: string, cur: number): number;
    protected consumeFQDN(str: string, cur: number): number;
    protected consumeExtnAddr(str: string, cur: number): number;
    protected consumeMulticastAddress(str: string, cur: number, type: string): number;
    protected consumeIP6MulticastAddress(str: string, cur: number): number;
    protected consumeIP4MulticastAddress(str: string, cur: number): number;
    protected consumeInteger(str: string, peek: number): number;
    protected consumeTTL(str: string, peek: number): number;
    protected consumeToken(str: string, cur: number): number;
    protected consumeTime(recordValue: string, cur: number): number;
    protected consumeAddress(value: string, cur: number): number;
    protected consumeTypedTime(recordValue: string, cur: number): number;
    protected consumeRepeatInterval(recordValue: string, cur: number): number;
    protected consumePort(value: string, cur: number): number;
    protected consume(value: string, cur: number, predicate: string): number;
    protected consumeTill(value: string, cur: number, till: ((char: string) => boolean) | string | undefined): number;
}

export declare interface PayloadAttribute {
    rtpMap?: RTPMap;
    fmtp?: Fmtp;
    rtcpFeedbacks: RTCPFeedback[];
    payloadType: number;
}

export declare type PayloadMap = Record<string, PayloadAttribute>;

/**
 * @public
 * */
declare function print_2(sessionDesc: SessionDescription, EOL?: string): string;
export { print_2 as print }

/**
 * @public
 * */
export declare class Printer {
    private eol;
    print(sessionDescription: SessionDescription, EOL?: string): string;
    private printVersion;
    private printOrigin;
    private printSessionName;
    private printInformation;
    private printUri;
    private printEmail;
    private printPhone;
    private printConnection;
    private printBandwidth;
    private printTimeFields;
    private printKey;
    private printAttributes;
    private printMediaDescription;
    private printConnections;
    private printMedia;
    private printSessionAttributes;
    private printMediaAttributes;
}

declare interface Record_2 {
    type: RECORD_TYPE;
    value: string;
    cur: number;
    line: number;
}
export { Record_2 as Record }

declare enum RECORD_TYPE {
    VERSION = "v",
    ORIGIN = "o",
    SESSION_NAME = "s",
    INFORMATION = "i",
    URI = "u",
    EMAIL = "e",
    PHONE = "p",
    CONNECTION = "c",
    BANDWIDTH = "b",
    TIME = "t",
    REPEAT = "r",
    ZONE_ADJUSTMENTS = "z",
    KEY = "k",
    ATTRIBUTE = "a",
    MEDIA = "m"
}

declare interface RemoteCandidate {
    componentId: string;
    connectionAddress: string;
    port: string;
}

export declare type RemoteCandidates = RemoteCandidate[];

export declare interface Repeat {
    repeatInterval: string;
    typedTimes: string[];
}

export declare interface RID {
    id: string;
    direction: "send" | "recv";
    payloads?: string[];
    params: RIDParam[];
}

export declare interface RIDBppParam {
    type: "max-bpp";
    val?: string;
}

export declare interface RIDBrParam {
    type: "max-br";
    val?: string;
}

export declare interface RIDDependParam {
    type: "depend";
    rids: string[];
}

export declare interface RIDFpsParam {
    type: "max-fps";
    val?: string;
}

export declare interface RIDFsParam {
    type: "max-fs";
    val?: string;
}

export declare interface RIDHeightParam {
    type: "height-width";
    val?: string;
}

export declare interface RIDOtherParam {
    type: string;
    val?: string;
}

export declare type RIDParam = RIDWidthParam | RIDHeightParam | RIDFpsParam | RIDFsParam | RIDBrParam | RIDPpsParam | RIDBppParam | RIDDependParam | RIDOtherParam;

export declare interface RIDPpsParam {
    type: "max-pps";
    val?: string;
}

export declare interface RIDWidthParam {
    type: "max-width";
    val?: string;
}

export declare interface RTCP {
    port: string;
    netType?: string;
    addressType?: string;
    address?: string;
}

export declare type RTCPFeedback = ACKFeedback | NACKFeedback | TRRINTFeedback | OtherFeedback;

export declare interface RTPMap {
    encodingName: string;
    clockRate: string;
    encodingParameters?: number;
}

export declare interface SessionAttributes {
    groups: Group[];
    iceLite?: boolean;
    iceUfrag?: string;
    icePwd?: string;
    iceOptions?: string[];
    fingerprints: FingerPrint[];
    setup?: Setup;
    tlsId?: string;
    identities: Identity[];
    extmaps: Extmap[];
    unrecognized: Attribute[];
    msidSemantic?: MsidSemantic;
}

/**
 * @public
 * */
export declare interface SessionDescription {
    version: string;
    origin: Origin;
    sessionName?: string;
    information?: string;
    uri?: string;
    emails: string[];
    phones: string[];
    connection?: Connection;
    bandwidths: Bandwidth[];
    timeFields: TimeField[];
    key?: Key;
    attributes: SessionAttributes;
    mediaDescriptions: MediaDescription[];
}

export declare type Setup = "active" | "passive" | "actpass" | "holdconn";

export declare interface SSRC {
    ssrcId: number;
    attributes: Record<string, string | undefined>;
}

export declare interface SSRCGroup {
    semantic: string;
    ssrcIds: number[];
}

export declare interface TimeField {
    time: {
        startTime: string;
        stopTime: string;
    };
    repeats: Repeat[];
    zoneAdjustments?: {
        time: string;
        typedTime: string;
        back: boolean;
    }[];
}

export declare interface TRRINTFeedback {
    type: "trr-int";
    interval: string;
}

export { }
