import {EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ThreeSixtyFactory} from './three-sixty.factory';
import {HotspotInterface} from '@rischkong/three-sixty/dist/interfaces/hotspot.interface';
import {ImageSetInterface} from '@rischkong/three-sixty/dist/interfaces/image-set.interface';

export declare class ThreeSixtyComponent implements OnInit, OnChanges {
  private threeSixtyFactory;
  /**
   * The canvas width
   */
  width: number;
  /**
   * The canvas height
   */
  height: number;
  /**
   * Current angle
   */
  angle: number;
  /**
   * Total amount of angles
   */
  angles: number;
  /**
   * Amount of angles per image
   */
  anglesPerImage: number;
  /**
   * The initial angle to show (number between 0 and 360)
   */
  startAngle: number;
  /**
   * Image set with all (ordered) image urls
   */
  images: ImageSetInterface;
  /**
   * The factor which increases the drag speed
   * Default to 5
   */
  speedFactor: number;
  /**
   * Array of hotspots
   */
  hotspots: HotspotInterface[];
  /**
   * Flag to control if all images should be preloaded
   */
  preload: boolean;
  /**
   * Gets emitted when the images were preloaded
   */
  preloaded: EventEmitter<null>;

  /**
   * Gets emitted when rotated
   */
  rotated: EventEmitter<null>;

  /**
   * The canvas element reference
   */
  private canvasElement;
  /**
   * The three sixty instance
   */
  private threeSixty;

  /**
   * @param threeSixtyFactory
   */
  constructor(threeSixtyFactory: ThreeSixtyFactory);

  /**
   * @inheritDoc
   */
  ngOnInit(): void;

  /**
   * @inheritDoc
   */
  ngOnChanges(changes: SimpleChanges): void;

  /**
   * Force a preload of all images
   */
  forcePreload(): void;

  /**
   * Preload all images if the preload flag is set
   */
  private preloadImages();

  /**
   * Get the configuration object for the ThreeSixty instance
   */
  private getThreeSixtyConfiguration();

  /**
   * Goto Angle
   */
  public gotoAngle(desiredAngle: number): void;

  /**
   * Goto Angle
   */
  public gotoAngleWithDistance(desiredAngle: number): void;

  /**
   * Get Angle
   */
  public getAngle(): number;
}
