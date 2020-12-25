<template>
    <div class="container">
        <div class="btns">
            <div class="btn" v-for="(item, i) in config" :key="i" @click="change(i)">{{item}}</div>
        </div>
       <div class="table">
            <div v-if="isError">
                暂无数据
            </div>
            <div v-else>
                <div class="theader">
                    <div v-for="(item, i) in mydata.columnDetails" :key="i" class="td">
                        {{item.label}}
                    </div>
                </div>
                <div class="tbody">
                    <div v-for="(item, i) in mydata.data" :key="i" class="tr">
                        <div class="td" v-for="(tdData, j) in item" :key="j">{{tdData}}</div>
                    </div>
                </div>
            </div>
       </div>
        
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { 
    data,
    data1,
    data2
} from './data';


@Component({

})
export default class Evaluate extends Vue {
    config = [
        '数据1',
        '数据2',
        '数据3'
    ]
    mydata: any = data.data
    
    get isError () {
        if (this.mydata.columnDetails && this.mydata.data) {
            return false
        } 
        return true
    }
    change(index: number) {
        switch (index) {
            case 0:
                this.mydata = data.data
                break;
            case 1:
                this.mydata = data1.data
                break;
            case 2:
                this.mydata = data2.data
                break;
            default:
                break;
        }
        
    }
}
</script>

<style lang="less">
    .container {
        .btns {
            display: flex;

            .btn {
                margin-right: 3px;
                width: 30px;
                height: 30px;
                font-size: 8px;
                justify-content: center;
                align-items: center;
                display: flex;
                cursor: pointer;
            }
        }
        .table {
            border: 1px solid #ddd;
            width: 100px;
            font-size: 10px;

            .theader,
            .tbody {
                display: flex;

                &.tbody {
                    flex-direction: column;
                }

                .tr {
                 display: flex;
                }

                .td {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #ddd;
                    padding: 5px 10px;
                }
            }
        }
        
        
    }
</style>
