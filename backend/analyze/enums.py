from enum import Enum
class ParameterModify(Enum):
    INCREASE_VALUE_HR = 'INCREASE_VALUE_HR'
    DECREASE_VALUE_HR = 'DECREASE_VALUE_HR'
    INCREASE_VALUE = 'INCREASE_VALUE'
    DECREASE_VALUE = 'DECREASE_VALUE'
    CHANGE_VALUE = 'CHANGE_VALUE'
    KEEP_VALUE = 'KEEP_VALUE'
    ADD_MODULE = 'ADD_MODULE'

class StandardSize(Enum):
    TIGHTLY_BALANCE = 0.4
    BALANCE = 0.8
    SOMEWHAT_REDICAL = 1.2
    RADICAL = 1.5
    EXTREMLY_RADICAL = 2
    NO_ITEMS = -1
    FEW_ITEMS = -2

class AccuracyClass(Enum):
    EXCELLENT = 0.95
    GREAT = 0.9
    GOOD = 0.85
    MEDIOCRE = 0.75
    NEED_IMPROVEMENT = 0.6
    BAD = 0.4
    VERY_BAD = 0.2
