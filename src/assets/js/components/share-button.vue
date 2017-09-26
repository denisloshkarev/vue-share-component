<template>
    <div class="share-wrapper" v-bind:class="{open: isOpen}">
        <div class="shares">
            <div v-for="(share, index) in shares" class="btn circle share" v-bind:class="[share.name, 'share-' + index, {selected: share.isSelected}]" v-on:click="toogleIcon(share)">
                <i class="fa" v-bind:class="share.icon"></i>
            </div>
        </div>
        <div class="actions" v-bind:class="{selected: isSelected, shared: isShared}">
            <div class="btn circle share" v-bind:class="{success: isSelected || isShared}" v-on:click="shareTo">
                <i class="material-icons">&#xE5CA;</i> <!-- check -->
                <!--<i class="material-icons" v-else>&#xE145;</i> &lt;!&ndash; add &ndash;&gt;-->
            </div>
            <div class="btn circle cancel" v-bind:class="{rotate: isSelected}" v-on:click="open">
                <i class="material-icons">&#xE5CD;</i> <!-- close -->
            </div>
        </div>
    </div>
</template>
<script>
    module.exports =  {
        data() {
            return {
                isOpen: false,
                isShared: false,
                state: 'add',
                shares: [
                    {
                        name: 'facebook',
                        icon: 'fa-facebook',
                        isSelected: false
                    },
                    {
                        name: 'twitter',
                        icon: 'fa-twitter',
                        isSelected: false
                    },
                    {
                        name: 'instagram',
                        icon: 'fa-instagram',
                        isSelected: false
                    }
                ]
            }
        },
        computed: {
            isSelected() {
                return this.shares.some(function(share) {
                    return !!share.isSelected;
                })
            },
            isClosed() {
                return !this.isOpen;
            }
        },
        methods: {
            toogleIcon(share) {
                share.isSelected = !share.isSelected;
            },
            open() {
                this.isOpen = !this.isOpen;
                if (!this.isOpen) this.cancel();
            },
            cancel() {
                this.isOpen = false;
                this.shares.forEach((share) => {
                    if (share.isSelected) {
                        share.isSelected = false;
                    }
                });
            },
            shareTo() {
                if (this.isClosed) return;
                let shareTo = [];
                this.isOpen = false;
                this.shares.forEach((share) => {
                    if (share.isSelected) {
                        shareTo.push(share.name);
                        share.isSelected = false;
                    }
                });
                this.$emit('share', shareTo);
                setTimeout(() => this.isShared = true, 100);
                setTimeout(() => this.isShared = false, 2000);
            }
        }
    }
</script>
<style lang="scss">
    $color-success: #32ee9e;
    $color-cancel: #fd1a73;
    $shadow-color: #d9d9d9;
    $btn-size: 60px;
    $btn-margin: $btn-size / 10;
    $btn-out-size: $btn-size + $btn-margin;
    $half-btn-out-size: $btn-out-size / 2;
    $duration: .2s;

    .share-wrapper {
        transition: bottom $duration ease-out, right $duration ease-out;

        .btn {
            position: absolute;
            width: $btn-size;
            height: $btn-size;
            background: #dadada;
            transition: transform $duration ease-out, color $duration ease-out, background-color $duration ease-out, opacity $duration ease-in;
            &.circle {
                border-radius: 50%;
            }
        }

        .shares, .actions {
            transition: transform $duration ease-out;
            .btn, .material-icons {
                font-size: 0.56 * $btn-size;
                line-height: $btn-size;
            }
            .btn {
                margin: $btn-margin;
                display: inline-block;
                text-align: center;
                color: #b8b9b9;
                cursor: pointer;

                &.selected {
                    box-shadow: 0 0 ($btn-size / 2) $shadow-color;
                    color: #fff;
                    &.facebook {
                        background-color: #3b5998;
                    }
                    &.twitter {
                        background-color: #4099ff;
                    }
                    &.instagram {
                        background-color: #8e46b6;
                    }
                }
            }
        }

        .actions {
            .btn {
                box-shadow: 0 0 ($btn-size / 2) $shadow-color;
            }
            .success {
                background-color: $color-success;
                color: #fff;
            }
            .cancel {
                transform: rotate(135deg);
                opacity: 1;
            }
            &.shared {
                .share {
                    transform: rotate(360deg) translateX(0) !important;
                    z-index: 2;
                }
                .cancel {
                    z-index: 1;
                    opacity: 0;
                }
            }
        }

        &.open {
            .shares {
                transform: translateY(-$half-btn-out-size);
                .share {
                    &:first-child {
                        transform: translateX(-($btn-size + $btn-margin));
                    }
                    &:last-child {
                        transform: translateX($btn-size + $btn-margin);
                    }
                }
            }
            .actions {
                transform: translateY($half-btn-out-size);
                .btn {
                    color: #fff;
                }
                .share {
                    transform: rotate(-90deg);
                }
                .cancel {
                    background-color: $color-cancel;
                    transform: rotate(0);
                }
                &.selected {
                    .share {
                        transform: rotate(0deg) translateX($half-btn-out-size);
                    }
                    .cancel {
                        transform: rotate(-90deg) translateY(-$half-btn-out-size);
                    }
                }
            }
        }
    }
</style>